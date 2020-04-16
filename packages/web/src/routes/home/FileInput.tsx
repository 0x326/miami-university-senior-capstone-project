import React, {
  useRef,
} from 'react'
import { FormEvent } from 'react';

// Old API (React classes)
// class FooComponent {
//   constructor(props) {
//     super(props)

//   }

//   someCustomThing() {

//   }

//   // Special ("lifecycle method") -- Does not apply for these
//   componentDidMount() {

//   }

//   render() {
//     this.someCustomThing
//   }
// }



// new API (React hooks)

interface Props {
  onFileUpload: (file: ArrayBuffer) => void;
}

function FileInput(props: Props): JSX.Element {
  const {
    onFileUpload,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (inputRef.current !== null && inputRef.current.files !== null) {
        const fileReader = new FileReader();
        const file = inputRef.current.files[0]

        fileReader.readAsArrayBuffer(file)

        fileReader.onload = function() {
          onFileUpload(fileReader.result as ArrayBuffer)
        }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input type="file" ref={inputRef} />
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default FileInput
