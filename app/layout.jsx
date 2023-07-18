import "@styles/globals.css";
import Nav from "@components/Nav";
import Provider from "@components/Provider";
export const metadata = {
  title: "AniBuketsu",
  description: "Discover and manage your favourite anime",
};

const RootLayout = ({ children }) => (
  <html lang='en'>
  <head>
  <link rel="shortcut icon" href="/assets/images/logo.svg" />
  </head>
    <body>
      <Provider>
        <div className='main'>
          <div className='gradient'/>
        </div>
        <main className='app'>
         <Nav/>
          {children}
        </main>
        </Provider>
    </body>
  </html>
);

export default RootLayout;
