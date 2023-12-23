import './App.css';

// import AddButton from '@cc/react-components/AddButton';
// import SubButton from '@cc/react-components/SubButton';
import { AddButton, SubButton } from '@cc/react-components';

function App() {
  return (
    <div className="content">
      <AddButton />
      <SubButton />
      <p>Start building amazing things with Rsbuild.</p>
    </div>
  );
}

export default App;
