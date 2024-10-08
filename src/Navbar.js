import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'

const getNavigationList = (active)=>{
    var navigation = [
      { name: 'Tabular', href: '/', current: active == "Tabular" ? true: false },
      { name: 'Textual', href: '/textual', current: active == "Textual" ? true: false },
      { name: 'RGB Images', href: '/images', current: active == "Image" ? true: false },
    ]

    return navigation
}



function navigationFunction(item){
    return item.name
}


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


function buttons(active){
    return <div className="flex space-x-4">
        {getNavigationList(active).map(
            (item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    aria-current={item.current ? 'page' : undefined}
                    className={classNames(
                      item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                      'rounded-md px-3 py-2 text-sm font-medium',
                    )}
                  >
                    {navigationFunction(item)}
                  </a>
            )
        )}
        </div>
}


export default function Navbar(props) {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button*/}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
            <div className="hidden sm:ml-6 sm:block">
              {buttons(props.active)}
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
          {buttons(props.active)}
      </DisclosurePanel>
    </Disclosure>
  )
}