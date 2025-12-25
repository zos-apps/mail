import React, { useState } from 'react';
import type { AppProps } from './types';

export interface MailConfig {
  defaultTo?: string;
  defaultSubject?: string;
  signature?: string;
  onSend?: (email: { to: string; subject: string; body: string }) => Promise<boolean>;
}

const ZMail: React.FC<AppProps & { config?: MailConfig }> = ({ className, config }) => {
  const [to, setTo] = useState(config?.defaultTo || '');
  const [subject, setSubject] = useState(config?.defaultSubject || '');
  const [body, setBody] = useState(config?.signature ? `\n\n${config.signature}` : '');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!to || !subject) {
      alert('Please fill in all required fields');
      return;
    }

    setSending(true);

    if (config?.onSend) {
      const success = await config.onSend({ to, subject, body });
      if (success) {
        setSent(true);
        setSubject('');
        setBody(config.signature ? `\n\n${config.signature}` : '');
      }
    } else {
      // Simulate sending
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSent(true);
      setSubject('');
      setBody(config?.signature ? `\n\n${config.signature}` : '');
    }

    setSending(false);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <div className={`flex flex-col h-full bg-white ${className || ''}`}>
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button className="p-2 rounded hover:bg-gray-200 transition-colors" title="Attach file">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <button className="p-2 rounded hover:bg-gray-200 transition-colors" title="Format">
            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
        </div>
        <button
          onClick={handleSend}
          disabled={sending || !to || !subject}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
          {sending ? 'Sending...' : 'Send'}
        </button>
      </div>

      {/* Success Banner */}
      {sent && (
        <div className="px-4 py-2 bg-green-100 border-b border-green-200 text-green-700 text-sm flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
          Email sent successfully!
        </div>
      )}

      {/* Email Form */}
      <form onSubmit={handleSend} className="flex-1 flex flex-col overflow-hidden">
        {/* To Field */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200">
          <label className="w-20 text-gray-500 text-sm">To:</label>
          <input
            type="email"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800"
            placeholder="recipient@example.com"
            required
          />
        </div>

        {/* CC Field */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200">
          <label className="w-20 text-gray-500 text-sm">Cc:</label>
          <input
            type="text"
            className="flex-1 bg-transparent outline-none text-gray-800"
            placeholder="Add Cc recipients..."
          />
        </div>

        {/* Subject Field */}
        <div className="flex items-center px-4 py-3 border-b border-gray-200">
          <label className="w-20 text-gray-500 text-sm">Subject:</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-800"
            placeholder="Enter subject..."
            required
          />
        </div>

        {/* Body */}
        <div className="flex-1 overflow-hidden">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="w-full h-full p-4 outline-none resize-none text-gray-800"
            placeholder="Write your message..."
          />
        </div>
      </form>

      {/* Footer */}
      <div className="px-4 py-2 bg-gray-50 border-t border-gray-200 text-xs text-gray-500 flex items-center justify-between">
        <span>Draft saved</span>
        <div className="flex items-center gap-4">
          <button className="hover:text-gray-700 transition-colors">
            Templates
          </button>
          <button className="hover:text-gray-700 transition-colors">
            Signature
          </button>
        </div>
      </div>
    </div>
  );
};

export default ZMail;
