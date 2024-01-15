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
} from '@nextui-org/react'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'
import Logo from './Logo'

export default function Header() {
  return (
    <Navbar>
      <NavbarBrand>
        <Logo></Logo>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <Dropdown>
          <NavbarItem>
            <DropdownTrigger>
              <Button
                disableRipple
                className="p-0 bg-transparent data-[hover=true]:bg-transparent"
                endContent={<ChevronDown></ChevronDown>}
                radius="sm"
                variant="light"
              >
                Relatórios
              </Button>
            </DropdownTrigger>
          </NavbarItem>
          <DropdownMenu
            aria-label="ACME features"
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
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
