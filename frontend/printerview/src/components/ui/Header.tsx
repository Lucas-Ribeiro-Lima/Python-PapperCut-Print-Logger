import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
} from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'
import Logo from './Logo'
import { useState } from 'react'

const menuItems = [
  'Inicio',
  'Dashboard',
  'Relátorios',
  'Importar',
  'Configurações',
  'Log In/Log Out',
]

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
          <Link href="#">Inicio</Link>
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
              Analítico
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
        <NavbarItem className="hidden lg:flex">
          <Button as={Link} color="primary" href="#" variant="flat">
            Log In
          </Button>
        </NavbarItem>
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
