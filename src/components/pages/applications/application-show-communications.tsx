import ChatInterface, { ChatMessage } from "@components/chat-interface";
import { useList, useNotification, useOne } from "@refinedev/core";
import { createClient } from "@refinedev/supabase";
import { extractReplyOnly } from "@utils";
import { supabaseBrowserClient } from "@utils/supabase/client";
import { SUPABASE_KEY, SUPABASE_URL } from "@utils/supabase/constants";
import { Tables } from "@utils/supabase/database.types";
import React, { useMemo, useState } from "react";

interface Props {
  id: string;
}

const ApplicationShowCommunications = (props: Props) => {
  const { id } = props;
  const {
    data: applicationData,
    isFetching: applicationDataIsFetching,
    isError: applicationDataIsError,
  } = useOne<Tables<"applications">>({
    resource: "applications",
    id,
  });
  const record = applicationData?.data;

  const {
    data: emailsData,
    isFetching: emailsDataIsFetching,
    isError: emailsDataIsError,
    refetch: refetchEmailData

  } = useList<Tables<"emails">>({
    resource: "emails",
    filters: [
      {
        field: "application_id",
        operator: "eq",
        value: record?.id ?? "",
      },
    ],
  });

  const { data: applicantData } = useOne<Tables<"applicants">>({
    resource: "applicants",
    id: record?.applicant_id ?? undefined,
  });

  const { data: jobData } = useOne<Tables<"jobs">>({
    resource: "jobs",
    id: record?.job_id ?? undefined,
  });

  const isLoading = useMemo(
    () => applicationDataIsFetching || emailsDataIsFetching,
    [emailsDataIsFetching, applicationDataIsFetching]
  );

  const messages = useMemo(() => {
    if (!emailsData) return [] as ChatMessage[];

    const transformedEmailMessages = emailsData.data.map((e) => {
      const getContent = () => {
        if (!e.body) return "";

        if (e.sender_type === "admin") {
          return e.body
            .replace(/<[^>]+>/g, "")
            .replace(/\s+/g, " ")
            .trim();
        }

        if (e.sender_type === "applicant") {
          return extractReplyOnly(e.body);
        }
      };

      return {
        id: e.id,
        content: getContent(),
        role: e.sender_type,
        timestamp: e.sent_at ? new Date(e.sent_at) : new Date(),
      };
    }) as ChatMessage[];

    return transformedEmailMessages;
  }, [emailsData]);

  const { open: openNotification } = useNotification();
  const [isSending, setIsSending] = useState(false);

  const handleSendMessage = async (content: string) => {
    if (!applicantData || !jobData) return;

    const emailBody = {
      to: applicantData.data.email,
      subject: `Re: Application for ${jobData.data.title} successfully received`,
      body: content,
      from: `apply+${jobData.data.email}`,
    };

    try {
      setIsSending(true);
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(emailBody),
      });

      openNotification?.({
        type: "success",
        message: "Email sent",
        description: "Message sent successfully!"
      });

      refetchEmailData();
      setIsSending(false);
    } catch (error) {
            openNotification?.({
        type: "error",
        message: "Email failed",
        description: "Something went wrong..."
      })
    }
  };

  if (emailsDataIsError || applicationDataIsError) {
    return <div>Something went wrong!</div>;
  }

  return (
    <ChatInterface
      messages={messages}
      onSendMessage={handleSendMessage}
      isLoading={isLoading}
      isSending={isSending}
      title="Email Thread"
      placeholder="Enter your message..."
      showAttachButton={false}
      showOptionsButton={false}
    />
  );
};

export default ApplicationShowCommunications;
