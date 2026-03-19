import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <>
            <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
            
                * {
                    font-family: "Poppins", sans-serif;
                }
            `}</style>
            <footer className='bg-black py-10 sm:py-12 lg:py-14 px-4 sm:px-6 lg:px-8'>
                <div className='w-full max-w-screen-2xl mx-auto'>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-8">

                        <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <Link href="https://prebuiltui.com" className="block w-full max-w-[140px] sm:max-w-[157px]">
                                <svg width="157" height="40" viewBox="0 0 157 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
                                    <path d="M47.904 28.28q-1.54 0-2.744-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.82 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.868 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.456.924-3.276.924m-7.196 5.32V14.56h3.08v3.612l-.532 3.276.532 3.248V33.6zm6.692-8.232q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128t.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.868.504 1.988.504M56.95 28V14.56h3.08V28zm3.08-7.476-1.064-.532q0-2.548 1.12-4.116 1.148-1.596 3.444-1.596 1.008 0 1.82.364.812.365 1.512 1.176l-2.016 2.072a2.1 2.1 0 0 0-.812-.56 3 3 0 0 0-1.036-.168q-1.287 0-2.128.812-.84.811-.84 2.548m14.156 7.756q-2.016 0-3.64-.896a7 7 0 0 1-2.548-2.52q-.924-1.596-.924-3.584t.924-3.556a6.87 6.87 0 0 1 2.492-2.52q1.596-.924 3.528-.924 1.876 0 3.304.868a6.05 6.05 0 0 1 2.268 2.38q.84 1.512.84 3.444 0 .336-.056.7a7 7 0 0 1-.112.756H69.23v-2.52h9.436l-1.148 1.008q-.056-1.232-.476-2.072a3 3 0 0 0-1.204-1.288q-.756-.448-1.876-.448-1.176 0-2.044.504a3.43 3.43 0 0 0-1.344 1.428q-.476.896-.476 2.156t.504 2.212 1.428 1.484q.924.504 2.128.504 1.037 0 1.904-.364a4 4 0 0 0 1.512-1.064l1.96 1.988a6.3 6.3 0 0 1-2.38 1.736 7.6 7.6 0 0 1-2.968.588m15.91 0q-1.54 0-2.745-.644a5.1 5.1 0 0 1-1.904-1.82q-.672-1.148-.672-2.604v-3.864q0-1.456.7-2.604a4.9 4.9 0 0 1 1.904-1.792q1.204-.672 2.716-.672 1.82 0 3.276.952a6.44 6.44 0 0 1 2.324 2.52q.869 1.567.868 3.556 0 1.96-.868 3.556a6.5 6.5 0 0 1-2.324 2.492q-1.455.924-3.276.924M82.898 28V7.84h3.08v10.024l-.532 3.248.532 3.276V28zm6.692-2.632q1.12 0 1.96-.504a3.6 3.6 0 0 0 1.344-1.456q.504-.924.504-2.128t-.504-2.128a3.43 3.43 0 0 0-1.344-1.428q-.84-.532-1.96-.532t-1.988.532a3.43 3.43 0 0 0-1.344 1.428q-.476.924-.476 2.128.001 1.204.476 2.128a3.6 3.6 0 0 0 1.344 1.456q.87.504 1.988.504m15.067 2.912q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.643.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.976-.28V14.56h3.08V28zm1.54-15.904q-.783 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.813 0 1.316.532t.504 1.316q0 .784-.504 1.316t-1.316.532M120.169 28V7.84h3.08V28zm8.552 0V8.96h3.08V28zm-3.22-10.64v-2.8h9.52v2.8zm17.274 10.92q-1.708 0-3.052-.756a5.5 5.5 0 0 1-2.072-2.072q-.728-1.344-.728-3.08V14.56h3.08v7.672q0 .98.308 1.68.336.672.952 1.036.643.364 1.512.364 1.344 0 2.044-.784.728-.812.728-2.296V14.56h3.08v7.812q0 1.764-.756 3.108a5.3 5.3 0 0 1-2.044 2.072q-1.317.728-3.052.728m8.977-.28V14.56h3.08V28zm1.54-15.904q-.785 0-1.316-.532-.504-.532-.504-1.316t.504-1.316a1.8 1.8 0 0 1 1.316-.532q.812 0 1.316.532t.504 1.316-.504 1.316-1.316.532" fill="white" />
                                    <path d="m8.75 11.3 6.75 3.884 6.75-3.885M8.75 34.58v-7.755L2 22.939m27 0-6.75 3.885v7.754M2.405 15.408 15.5 22.954l13.095-7.546M15.5 38V22.939M29 28.915V16.962a2.98 2.98 0 0 0-1.5-2.585L17 8.4a3.01 3.01 0 0 0-3 0L3.5 14.377A3 3 0 0 0 2 16.962v11.953A2.98 2.98 0 0 0 3.5 31.5L14 37.477a3.01 3.01 0 0 0 3 0L27.5 31.5a3 3 0 0 0 1.5-2.585" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </Link>
                            <div className='w-full max-w-52 h-px mt-6 sm:mt-8 bg-linear-to-r from-black via-white/25 to-black'></div>
                            <p className='text-sm sm:text-base mt-4 sm:mt-6 max-w-md text-white/60 leading-relaxed'>
                                PrebuiltUI is a growing collection of beautifully designed, production-ready Tailwind CSS UI components.
                            </p>
                        </div>

                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h3 className='text-sm sm:text-base lg:text-lg text-white font-semibold'>Important Links</h3>
                            <div className="flex flex-col gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                                <Link href="/" className='text-sm sm:text-base text-white/60 hover:text-white transition-colors'>Home</Link>
                                <Link href="/about" className='text-sm sm:text-base text-white/60 hover:text-white transition-colors'>About</Link>
                                <Link href="/portfolio" className='text-sm sm:text-base text-white/60 hover:text-white transition-colors'>Portfolio</Link>
                                <Link href="/contact" className='text-sm sm:text-base text-white/60 hover:text-white transition-colors'>Contact</Link>
                                <Link href="/faq" className='text-sm sm:text-base text-white/60 hover:text-white transition-colors'>FAQ</Link>
                            </div>
                        </div>

                        <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h3 className='text-sm sm:text-base lg:text-lg text-white font-semibold'>Social Links</h3>
                            <div className="flex flex-col gap-1.5 sm:gap-2 mt-4 sm:mt-6">
                                <Link href="https://twitter.com" target="_blank" rel="noopener noreferrer" className='text-sm sm:text-base text-white/60 hover:text-white transition-colors'>Twitter</Link>
                                <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer" className='text-sm sm:text-base text-white/60 hover:text-white transition-colors'>Instagram</Link>
                                <Link href="https://youtube.com" target="_blank" rel="noopener noreferrer" className='text-sm sm:text-base text-white/60 hover:text-white transition-colors'>Youtube</Link>
                                <Link href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className='text-sm sm:text-base text-white/60 hover:text-white transition-colors'>Linkedin</Link>
                            </div>
                        </div>

                        <div className="sm:col-span-2 lg:col-span-1 flex flex-col items-center sm:items-start text-center sm:text-left">
                            <h3 className='text-sm sm:text-base lg:text-lg text-white font-semibold'>Subscribe for news</h3>
                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center border gap-2 border-white/20 h-auto sm:h-12 min-h-[44px] sm:min-h-0 max-w-full sm:max-w-80 w-full rounded-full overflow-hidden mt-4">
                                <input type="email" placeholder="Enter your email.." className="w-full h-11 sm:h-full flex-1 pl-4 sm:pl-6 outline-none text-sm sm:text-base bg-transparent text-white placeholder-white/60 placeholder:text-xs sm:placeholder:text-sm" required />
                                <button type="submit" className="bg-linear-to-b from-[#5623D8] to-[#7B53E2] active:scale-95 transition w-full sm:w-40 lg:w-30 h-11 sm:h-10 rounded-full text-sm sm:text-base text-white cursor-pointer sm:mr-1.5 shrink-0">Subscribe</button>
                            </div>
                        </div>

                    </div>

                    <div className='w-full h-px mt-10 sm:mt-14 lg:mt-16 mb-4 sm:mb-6 bg-linear-to-r from-black via-white/25 to-black'></div>

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                        <p className='text-xs sm:text-sm text-white/60 text-center sm:text-left'>© 2025 PrebuiltUI</p>
                        <div className="flex items-center justify-center gap-4 sm:gap-6 flex-wrap">
                            <Link href='/terms' className='text-xs sm:text-sm text-white/60 hover:text-white transition-colors'>Terms & Conditions</Link>
                            <div className='w-px h-4 bg-white/20 hidden sm:block'></div>
                            <Link href='/privacy' className='text-xs sm:text-sm text-white/60 hover:text-white transition-colors'>Privacy Policy</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
};