import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input } from '@nextui-org/react'
import { LogInIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { AuthContext, SignInType } from '../context/authProvider'
import Logo from './Logo'

const LoginSchema = z.object({
  username: z.string().min(1, 'Insira o nome de usuário'),
  password: z.string().min(1, 'Insira sua senha'),
})

type LoginData = z.infer<typeof LoginSchema>

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(LoginSchema),
  })

  const router = useRouter()
  const { signIn } = useContext(AuthContext)

  async function handleSignIn({ username, password }: SignInType) {
    try {
      await signIn({ username, password })
      router.back()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form className="flex flex-col gap-4 w-1/3">
      <div>
        <Input
          {...register('username')}
          type="text"
          label="Username"
          required
        ></Input>
        {errors?.username && (
          <span className="font-semibold text-red-600 text-sm">
            {errors.username.message}
          </span>
        )}
      </div>
      <div>
        <Input
          {...register('password')}
          type="text"
          label="Password"
          required
        ></Input>
        {errors?.password && (
          <span className="font-semibold text-red-600 text-sm">
            {errors.password.message}
          </span>
        )}
      </div>
      <div className="flex items-center justify-center gap-4">
        <Button
          className="w-1/3 self-center"
          size="md"
          color="primary"
          radius="full"
          variant="shadow"
          startContent={<LogInIcon></LogInIcon>}
          onPress={handleSubmit(handleSignIn)}
        >
          Log-In
        </Button>
        <GithubLogin></GithubLogin>
      </div>
    </form>
  )
}

function GithubLogin() {
  return (
    <Button
      className="w-1/3 self-center"
      size="md"
      color="default"
      radius="full"
      variant="shadow"
      // onPress={signInOauth('github')}
    >
      Sign-In with
      <div className="font-bold">GITHUB</div>
    </Button>
  )
}

export default function LoginLayout() {
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-8">
      <div className="scale-150">
        <Logo></Logo>
      </div>
      <LoginForm></LoginForm>
    </div>
  )
}
