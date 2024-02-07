'use client'

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from '@nextui-org/react'
import { ChevronDown, LogOut } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { destroyCookie, parseCookies } from 'nookies'
import { useContext, useState } from 'react'
import { AuthContext } from '../context/authProvider'
import Logo from './Logo'

const menuItems = [
  'Inicio',
  'Dashboard',
  'Relátorios',
  'Importar',
  'Configurações',
  'Log In/Log Out',
]

export default function Header() {
  const { user } = useContext(AuthContext)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    const cookies = parseCookies()
    destroyCookie(cookies, 'printerViewJwt')
    router.refresh()
  }

  return (
    <Navbar isBordered onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Logo></Logo>
        </NavbarBrand>
      </NavbarContent>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link href="/">Inicio</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Dashboard</Link>
        </NavbarItem>
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown></ChevronDown>}
                radius="sm"
                color="warning"
                variant="light"
              >
                Relatórios
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="Tipos de relátorios"
            itemClasses={{
              base: 'gap-4',
            }}
          >
            <DropdownItem
              key="relatorio_sintetico"
              description="Relátorios Sintéticos"
              className="text-white"
            >
              Sintético
            </DropdownItem>
            <DropdownItem
              key="relatorio_analitico"
              description="Relátorios Analítico"
              className="text-white"
            >
              <Link href="/report/analytic">Analítico</Link>
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
        <NavbarItem>
          <Link href="#">Importar</Link>
        </NavbarItem>
        <NavbarItem>
          <Link href="#">Configurações</Link>
        </NavbarItem>
      </NavbarContent>
      <NavbarContent justify="end">
        {(!user && (
          <NavbarItem className="hidden lg:flex">
            <Button as={Link} color="primary" href="/login" variant="flat">
              Log In
            </Button>
          </NavbarItem>
        )) || (
          <Dropdown className="text-white" placement="bottom-end">
            <DropdownTrigger>
              <Avatar
                isBordered
                as="button"
                className="transition-transform"
                color="primary"
                name={user[0].userID}
                size="md"
                src={user[0].avatar_url}
              />
            </DropdownTrigger>
            <DropdownMenu aria-label="Profile Actions" variant="flat">
              <DropdownItem key="profile" className="h-14 gap-2">
                <p className="font-bold">Conectado como</p>
                <p className="font-bold">{user[0].userID}</p>
              </DropdownItem>
              <DropdownItem key="leave">
                <Button
                  onPress={handleLogout}
                  startContent={<LogOut />}
                  variant="light"
                >
                  Sair
                </Button>
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        )}
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              color={
                index === 2
                  ? 'primary'
                  : index === menuItems.length - 1
                    ? 'danger'
                    : 'foreground'
              }
              className="w-full"
              href="#"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
