/// <reference lib="deno.ns" />

import mammoth from 'https://esm.sh/mammoth';
import PDFParser from 'https://esm.sh/pdf2json';
import { SupabaseClient } from "jsr:@supabase/supabase-js@2.49.8";
import { Buffer } from 'node:buffer';

interface ArgsT {
  bucket: string, path: string
  // deno-lint-ignore no-explicit-any
  supabase: SupabaseClient<any, "public", any>;

}

export async function parseStorageText(args: ArgsT): Promise<string> {
  const { bucket, path, supabase } = args;

  const { data, error } = await supabase.storage.from(bucket).download(path);
  if (error || !data) {
    console.error(`Failed to download file: ${error?.message}`);
    return "";
  }

  const contentType = path.endsWith('.pdf') ? 'pdf' : path.endsWith('.docx') ? 'docx' : 'unknown';
  const stream = (data as Blob).stream() as ReadableStream<Uint8Array>;
  if (contentType === 'pdf') return await parsePDF(stream);
  if (contentType === 'docx') return await parseDOCX(stream);

  console.warn('Unsupported file type');
  return ""
}

async function parsePDF(file: ReadableStream<Uint8Array>): Promise<string> {
  const buffer = await streamToBuffer(file);
  const pdfParser = new PDFParser();

  return new Promise((resolve, reject) => {
    pdfParser.on("pdfParser_dataError", errData => reject(errData.parserError));
    pdfParser.on("pdfParser_dataReady", pdfData => {
      const text = pdfData.Pages.map(page =>
        page.Texts.map(textObj =>
          decodeURIComponent(textObj.R.map(r => r.T).join("") || "")
        ).join(" ")
      ).join("\n");
      resolve(text);
    });

    pdfParser.parseBuffer(buffer);
  });
}

async function parseDOCX(file: ReadableStream<Uint8Array>): Promise<string> {
  const uint8Array = await streamToBuffer(file);
  const buffer = Buffer.from(uint8Array);
  const result = await mammoth.extractRawText({ buffer });
  return result.value;
}

async function streamToBuffer(stream: ReadableStream<Uint8Array>): Promise<Uint8Array> {
  const reader = stream.getReader();
  const chunks: Uint8Array[] = [];
  let result;
  while (!(result = await reader.read()).done) chunks.push(result.value);
  return new Blob(chunks).arrayBuffer().then(buf => new Uint8Array(buf));
}
