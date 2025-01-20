import { FormField, Input } from "@/components/Form";
import { login, signup } from "./actions";
import Button from "@/components/Button";

export default function LoginPage() {
  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <FormField>
          <label htmlFor="email">Email:</label>
          <Input id="email" name="email" type="email" required />
        </FormField>
        <FormField>
          <label htmlFor="password">Password:</label>
          <Input id="password" name="password" type="password" required />
        </FormField>
      </div>
      <div className="flex flex-col gap-4">
        <Button variant="filled" formAction={login}>
          Log in
        </Button>
        <Button variant="ghost" formAction={signup}>
          Sign up
        </Button>
      </div>
    </form>
  );
}
