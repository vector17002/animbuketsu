import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
import { Toaster } from "react-hot-toast";
export const metadata = {
  title: "AniBuketsu",
  description: "Discover and manage your favourite anime",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
  <head>
  <link rel="shortcut icon" href="/assets/images/logo.svg" />
  </head>
  <Provider>
    <body>
        
        <main className='app'>
        <Toaster/>
        <Nav/>
        <div className='main'>
          <div className='gradient'/>
        </div>
          {children}
        </main>
    </body>
    </Provider>
  </html>
);

export default RootLayout;
