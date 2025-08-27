"use client"

import { useState } from "react";

export const Body = () => {
    const [sidebar, setSidebar] = useState(false);

    return (
        <>
            <button
                onClick={() => setSidebar(!sidebar)}
                className={sidebar?"absolute top-12 left-50 z-50 h-8 w-6 rounded-br-md bg-bg hover:bg-bg-dark border border-border border-l-0 ":"absolute top-12 z-50 h-8 w-6 rounded-br-md bg-bg hover:bg-bg-dark border border-border border-l-0 "}
            >
                {sidebar ? "✕" : "☰"}
            </button>
            {sidebar && (<div className="flex w-50 h-full p-2 flex-col items-start gap-2.5 flex-shrink-0 border-r border-r-border">
                <div className="flex justify-between items-start self-stretch text-text">
                    <p className="text-s not-italic font-normal">←</p>
                    <p className="text-s not-italic font-normal">Contacts</p>
                    <p className="text-s not-italic font-normal">+</p>
                </div>
                <div className="flex h-6 p-1 justify-start items-center flex-shrink-0 w-full bg-bg rounded-full gap-1.5 text-text-muted">
                    <p className="text-xs not-italic font-normal">􀊫</p>
                    <p className="text-xs not-italic font-normal">Search</p>
                </div>
                <div className="flex flex-col items-start self-stretch">
                    <div className="flex w-full h-4 px-2 py-1 items-center gap-1.5 rounded-full bg-bg-light text-text">
                        <p className="text-xs not-italic font-normal">A</p>
                    </div>
                    <div className="flex h-fit px-2 py-3 items-center gap-1.5 self-stretch">
                        <div className="flex items-center gap-0.5">
                            <p className="text-xs not-italic font-normal">Grace</p>
                            <p className="text-xs not-italic font-bold">Anderson</p>
                        </div>
                    </div>
                    <div className="flex w-full h-4 px-2 py-1 items-center gap-1.5 rounded-full bg-bg-light text-text">
                        <p className="text-xs not-italic font-normal">B</p>
                    </div>
                    <div className="flex h-fit px-2 py-3 items-center gap-1.5 self-stretch">
                        <div className="flex items-center gap-0.5">
                            <p className="text-xs not-italic font-normal">Andrew</p>
                            <p className="text-xs not-italic font-bold">Baker</p>
                        </div>
                    </div>
                    <div className="flex w-full h-4 px-2 py-1 items-center gap-1.5 rounded-full bg-bg-light text-text">
                        <p className="text-xs not-italic font-normal">W</p>
                    </div>
                    <div className="flex h-fit px-2 py-3 items-center gap-1.5 self-stretch">
                        <div className="flex items-center gap-0.5">
                            <p className="text-xs not-italic font-normal">Henry</p>
                            <p className="text-xs not-italic font-bold">Wagner</p>
                        </div>
                    </div>
                </div>
            </div>)}
            <div className="flex flex-1 w-full h-full px-22 py-9 flex-col items-start gap-6 flex-shrink-0 bg-bg-dark">
                <div className="flex items-center gap-4 self-stretch">
                    {/* Profile Photo*/}
                    <div className="flex w-24 h-24 justify-end items-center rounded-full bg-blue-500"></div>
                    {/* -------------*/}
                    <div className="flex flex-col justify-center items-start">
                        <p className="text-4xl not-italic font-normal text-text">Henry Wagner</p>
                        <p className="text-2xl not-italic font-normal text-text-muted">@htwags</p>
                    </div>
                </div>
                <div className="flex flex-col items-start self-stretch">
                    <div className="flex h-8 items-start self-stretch">
                        <div className="flex w-fit px-4 py-1 justify-center items-end gap-1 self-stretch text-text rounded-t-2xl border-t border-t-border border-l border-l-border border-r border-r-border">
                            <p className="text-base not-italic font-normal">􀉪</p>
                            <p className="text-base not-italic font-normal">Contact</p>
                        </div>
                        <div className="flex w-0.5 justify-center items-center self-stretch border-b-1 border-b-border"></div>
                        <div className="flex w-fit px-4 py-1 justify-center items-end gap-1 self-stretch text-text rounded-t-2xl border border-border">
                            <p className="text-base not-italic font-normal">􀉪</p>
                            <p className="text-base not-italic font-normal text-nowrap">Public Profile</p>
                        </div>
                        <div className="flex py-1 px-3 justify-center items-center gap-2 self-stretch border-b border-b-border">
                            <p className="text-xl not-italic font-normal">+</p>
                        </div>
                        <div className="flex w-full justify-center items-center self-stretch border-b border-b-border"></div>
                    </div>
                </div>
            </div>
        </>
    );
}
