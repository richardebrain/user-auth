import react from 'react';
import Header from './header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div>
            <Header />
            <main className='mx-auto w-[80%] mt-10'>
                {children}
            </main>

        </div>
    );
}

export default Layout;