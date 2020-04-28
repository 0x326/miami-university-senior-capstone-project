import React, {
  useRef,
} from 'react'
import { FormEvent } from 'react';
import { Button } from '@rmwc/button';

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
      if (inputRef.current.files.length > 0) {
        const fileReader = new FileReader();
        const file = inputRef.current.files[0]

        if (file.name) {
          const fileExtension = file.name.split('.')[1];
          if (fileExtension.localeCompare("xlsx") !== 0) {
            alert("The current file submitted is not a proper experiment file.\n\nProper experiment files can only be created by this program and will have the file extension '.xlsx'")
          } else {
            fileReader.readAsArrayBuffer(file)
            fileReader.onload = function() {
              onFileUpload(fileReader.result as ArrayBuffer)
            }
          }
        }
      } else {
        alert("Please upload an experiment file")
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
        <br />
        <Button raised type="submit">Submit</Button>
      </form>
    </>
  );
}

export default FileInput
