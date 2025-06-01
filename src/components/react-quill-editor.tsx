import "react-quill/dist/quill.snow.css";

import { memo, useMemo } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mui/material";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const ReactQuillEditor = (props: Props) => {
  const { value, onChange, placeholder } = props;

  // disable SSR for component as it uses browser API: document
  const ReactQuill = useMemo(() => {
    return dynamic(() => import("react-quill"), { ssr: false });
  }, []);

  const borderRadius = "6px";

  return (
    <Box
      sx={{
        "& .ql-toolbar.ql-snow": {
          borderTopLeftRadius: borderRadius,
          borderTopRightRadius: borderRadius,
          background: (theme) => theme.palette.primary.light,
          borderColor: "transparent"
        },

        "& .ql-container.ql-snow": {
          borderBottomLeftRadius: borderRadius,
          borderBottomRightRadius: borderRadius,
          background: (theme) => theme.palette.primary.light,
          borderColor: "transparent"
        }
      }}
    >
      <ReactQuill
        value={value}
        onChange={(value) => onChange(value)}
        placeholder={placeholder}
        modules={{
          toolbar: [
            [{ header: "1" }, { header: "2" }, { font: [] }],
            [{ list: "ordered" }, { list: "bullet" }],
            ["bold", "italic", "underline"],
            ["link"],
            [{ align: [] }],
            ["image"]
          ]
        }}
      />
    </Box>
  );
};

const MemoizedEditor = memo(ReactQuillEditor);

export default MemoizedEditor;
