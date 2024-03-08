interface AlertProps {
    children: React.ReactNode
}
function Alert({children}:AlertProps) {
    return (
        <>
         <div>Alert: {children} </div>
        </>
    )
} 
export default Alert