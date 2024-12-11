import { useState } from 'react'
import { BiMoon, BiShoppingBag } from 'react-icons/bi'
import { LuSunMoon } from 'react-icons/lu'

const Header = () => {

    const [theme, setTheme] = useState("")

    const themeHandler = (e:any) => {
        try {
            const { id } = e.target

            if (id === "night") {
                const ele:any = document.getElementById("root")
                ele.classList.add("dark")
                setTheme("night")
            }
            else {
                const ele:any = document.getElementById("root")
                ele.classList.remove("dark")
                setTheme("day")
            }

        } catch (err) {
            console.error(err)
        }
    }

    return (
        <header className='w-full sm:w-5/6 mx-auto flex justify-between p-3 sticky top-0 left-0 right-0 z-50 bg-white dark:bg-dark'>
            <div>
                <h2 className='cursor-pointer flex text-sky-500 items-center gap-2'>
                    <BiShoppingBag />
                    <span className='logo text-xl '>PRODUCT STORE</span>
                </h2>
            </div>
            <div>

                {theme === "night" ?
                    <button type='button' id='day' className='p-2 rounded-lg text-yellow-500' onClick={themeHandler}>
                        <LuSunMoon id='day' />
                    </button>
                    :
                    <button type='button' id='night' className='p-2 rounded-lg text-sky-500' onClick={themeHandler}>
                        <BiMoon id='night' />
                    </button>
                }
            </div>
        </header>
    )
}

export default Header 