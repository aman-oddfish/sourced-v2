import { Inter, Roboto_Mono, Bodoni_Moda } from 'next/font/google'
import localFont from 'next/font/local'
 
export const Bedani = Bodoni_Moda({
  subsets: ['latin'],
  display: 'swap',
})
 
export const roboto_mono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
})

 
// Font files can be colocated inside of `app`
export const Garmond = localFont({
  src: './d.woff',
  display: 'swap',
})

export const GarmondI = localFont({
  src: './d-i.woff',
  display: 'swap',
})

// export const creato_display = localFont({
//   src: './cd.woff2',
//   display: 'swap',
//   weight: '400',
//   style: 'normal',
// })