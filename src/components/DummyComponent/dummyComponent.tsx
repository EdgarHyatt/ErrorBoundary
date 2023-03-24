import { getErrorData } from '../../lib/common/getErrorData';
import { getErrorDataWithLibrary } from '../../lib/common/getErrorDataWithLibrary';

const DummyComponent = () => {
  const err = new Error();

  try {
    throw err;
  } catch(e) {
    if (e instanceof Error) {
      const errorData = getErrorData(e, "Message with function");
      console.error(errorData);

      const errorData2 = getErrorDataWithLibrary(e, "Message with get-current-line library");
      console.error(errorData2);
    } else {
      console.error(e);
    }
  }

  return <div>DummyComponent, check console for error</div>
}

export default DummyComponent;
