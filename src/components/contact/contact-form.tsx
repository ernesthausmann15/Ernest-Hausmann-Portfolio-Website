"use client";

import { FormEvent, useState } from "react";
import emailjs from "@emailjs/browser";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { site } from "@/lib/site";

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
};

const emptyForm: FormState = {
  name: "",
  email: "",
  company: "",
  message: "",
};

/**
 * Recruiter contact form.
 *
 * What: Sends name, email, company, and message through EmailJS.
 * Why: EmailJS delivers from the browser with a public key, so this site
 *      does not need its own mail server. The three IDs stay in environment
 *      variables so they can change per EmailJS account without a code edit.
 * How: `send` posts to EmailJS. Success clears the fields and raises a toast.
 *      A missing key, a network error, or a rejected template raises an error
 *      toast and leaves the message in place so it can be retried.
 *      The template in the EmailJS dashboard should expect `from_name`,
 *      `reply_to`, `company`, and `message`.
 */
export function ContactForm() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState("");

  function update(field: keyof FormState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      const notice = `Email delivery is not configured yet. Write to ${site.email}.`;
      setStatus(notice);
      toast.error(notice);
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: form.name,
          reply_to: form.email,
          company: form.company || "Not provided",
          message: form.message,
        },
        { publicKey },
      );
      setForm(emptyForm);
      const notice = "Message sent. Thank you — I will reply by email.";
      setStatus(notice);
      toast.success(notice);
    } catch {
      const notice = `The message did not send. Please try again, or email ${site.email}.`;
      setStatus(notice);
      toast.error(notice);
    } finally {
      setSending(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5" noValidate={false}>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            autoComplete="name"
            required
            value={form.name}
            onChange={(event) => update("name", event.target.value)}
            className="h-10"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            value={form.email}
            onChange={(event) => update("email", event.target.value)}
            className="h-10"
          />
        </div>
      </div>
      <div className="grid gap-2">
        <Label htmlFor="company">Company</Label>
        <Input
          id="company"
          name="company"
          autoComplete="organization"
          value={form.company}
          onChange={(event) => update("company", event.target.value)}
          className="h-10"
        />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          required
          minLength={10}
          rows={6}
          value={form.message}
          onChange={(event) => update("message", event.target.value)}
          className="min-h-32"
        />
      </div>
      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" disabled={sending} className="h-10 px-4">
          {sending ? "Sending…" : "Send message"}
        </Button>
        <p className="text-sm text-muted-foreground" aria-live="polite">
          {status}
        </p>
      </div>
    </form>
  );
}
