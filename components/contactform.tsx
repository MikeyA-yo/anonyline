"use client";
export default function ContactForm(){
    return (
        <>
          <div className="flex flex-col gap-4 p-5 items-center bg-[#2E073F] shadow-md shadow-[#EBD3F8] lg:min-h-96 md:min-h-80 md:w-[90%] justify-self-end">
            <h3 className="text-2xl">Send me a message</h3>
            <InputGrps>
              <InputContainer>
                <label htmlFor="name">Name</label>
                <input id="name" placeholder="Please enter your name"  className="p-2 rounded-md text-[#2E073F]"/>
              </InputContainer>
              <InputContainer>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="Please enter your email" className="p-2 rounded-md text-[#2E073F]" />
              </InputContainer>
            </InputGrps>
            <InputGrps>
              <InputContainer>
                <label htmlFor="Phone">Phone</label>
                <input id="Phone" type="tel" placeholder="Please enter your phone number" className="p-2 rounded-md text-[#2E073F]" />
              </InputContainer>
            </InputGrps>
            <InputGrps>
              <InputContainer>
                <label htmlFor="msg">Message</label>
                <textarea id="msg" placeholder="Please enter your message" className="p-2 rounded-md text-[#2E073F] min-h-20" />
              </InputContainer>
            </InputGrps>
            <button className="self-end px-2 py-1 bg-[#7A1CAC] rounded">Send</button>
          </div>
        </>
    )
}

 function InputContainer({ children }:{children:React.ReactNode}) {
    return <div className="flex flex-col flex-[1] gap-2">{children}</div>;
  }
 function InputGrps({ children }:{children:React.ReactNode}) {
    return (
      <div className="flex lg:flex-row flex-col w-full gap-2">
        {children}
      </div>
    );
  }