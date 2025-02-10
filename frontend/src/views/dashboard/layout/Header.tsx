import { useDispatch } from "react-redux";
import Container from "../../../components/atoms/Container/Container";
import { logoutThunk } from "../../../stores/auth/authThunks";
import { AppDispatch } from "../../../stores";

function Header() {
    const dispatcher = useDispatch<AppDispatch>();
  return (
    <Container>
      <header className="p-2 w-full flex justify-between">
        <h2>DaisyUI</h2>
        <div className="flex items-center">
          <button onClick={() => {dispatcher(logoutThunk())}} className="btn btn-outline btn-primary border-0 btn-sm">Logout</button>
        </div>
      </header>
    </Container>
  );
}

export default Header;
