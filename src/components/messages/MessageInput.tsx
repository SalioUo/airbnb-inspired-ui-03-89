
import React, { useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send } from 'lucide-react';

interface MessageInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  placeholder?: string;
}

const MessageInput: React.FC<MessageInputProps> = ({
  value,
  onChange,
  onSend,
  placeholder = "Écrivez un message..."
}) => {
  const inputRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (value.trim()) {
        onSend();
      }
    }
  };

  // Fix cursor position and focus input on mount
  useEffect(() => {
    if (inputRef.current) {
      // Focus the input
      inputRef.current.focus();
      
      // Clear existing content and set it properly to fix cursor position
      const content = value;
      inputRef.current.innerHTML = '';
      
      // Create and append text node
      if (content) {
        const textNode = document.createTextNode(content);
        inputRef.current.appendChild(textNode);
      }
      
      // Place cursor at the end
      const range = document.createRange();
      const sel = window.getSelection();
      if (inputRef.current.childNodes.length > 0) {
        const lastChild = inputRef.current.childNodes[inputRef.current.childNodes.length - 1];
        range.setStartAfter(lastChild);
      } else {
        range.setStart(inputRef.current, 0);
      }
      range.collapse(true);
      
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }
    }
  }, []);

  const handleInput = (e: React.FormEvent<HTMLDivElement>) => {
    onChange(e.currentTarget.textContent || '');
  };

  return (
    <div className="message-input-area">
      <div
        ref={inputRef}
        className="message-input"
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        data-placeholder={placeholder}
        suppressContentEditableWarning={true}
      ></div>
      
      <Button 
        onClick={onSend}
        disabled={!value.trim()}
        className="rounded-full bg-blue-500 hover:bg-blue-600"
        size="icon"
      >
        <Send className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MessageInput;
