import { Inter } from "next/font/google";
import config from "@/config";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const font = Inter({ subsets: ["latin"] });

export const viewport = {
 
  themeColor: config.colors.main,
  width: "device-width",
  initialScale: 1,
};



export const metadata = {
  title: "My Travel Project",  
  description: "Explore beautiful places in Bangladesh",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-theme={config.colors.theme} className={font.className}>
      <body>
        <Header/>
        <main>{children}</main>
        <Footer/>
      </body>
    </html>
  );
}
