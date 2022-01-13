import React from "react";
import { useInput } from "../hooks/useInput";

export default function FeedbackForm() {
  const [feedbackProps, resetFeedback] = useInput("");

  const submit = (e: any) => {
    e.preventDefault();
    console.log(feedbackProps.value);
    /* TODO: send to server */
    resetFeedback();
  };

  return (
    <form onSubmit={submit}>
      <h2 className="form__title">Do you think the character suits you?</h2>
      <input 
        className="form__input"
        {...feedbackProps}
        type="text"
        placeholder="share you opinion..."
        required
      />
      <button className="form__button">Send</button>
    </form>
  );
}