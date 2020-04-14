import React from 'react'
import { FormEvent } from 'react';

interface Props {
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

var fileInput = <input type="file" />

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  alert(
    // `Selected file - ${fileInput.files[0].name}`
  );
}

function FileInput(props: Props): JSX.Element {
  const {

  } = props

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          Upload file:
          <input type="file" />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default FileInput
