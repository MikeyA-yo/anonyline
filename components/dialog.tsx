export function Dialog({children, onClick}: { children: React.ReactNode; onClick: () => void }){
    return (
        <>
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/50 p-5" onClick={onClick}>
            {children}
          </div>
        </>
    )
}
