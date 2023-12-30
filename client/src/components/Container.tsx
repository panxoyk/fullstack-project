import { PropsWithChildren } from "react"

const Container = ({ children }: PropsWithChildren) => {
    return (
        <div className="max-w-screen-lg mx-auto">
            {children}
        </div>
    )
}

export default Container