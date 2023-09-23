import Footer from '@/components/footer';
import './globals.css'
import Header from '@/components/header';





export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body >
      <Header/>
      {children}
      <Footer/>
      </body>
    </html>
  )
}
