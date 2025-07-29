import { cardItemsMenu } from "@/data/data"
import Image from "next/image"
import { notFound } from "next/navigation"

interface paramsProps {
    params: {
        slug : string
    }
}

const index = ({params} : paramsProps) => {
    const menu = cardItemsMenu.find((item) => item.slug === params.slug)

    if (!menu) notFound();

    return (
        <div className="z-10 w-full flex flex-col items-center justify-center gap-5 p-5 ">
            <div className="w-1/4 flex items-center justify-center gap-3 px-3">
                <h1 className="text-4xl font-Inter font-semibold text-wrap text-center text-primary-100">{menu.title.split(' ')[0]} <span className="text-foreground">{menu.title.split(' ')[1]}</span></h1>
            </div>
            <div className="w-[30%] h-1/2 flex items-center justify-center rounded-lg overflow-hidden">
                <Image src={menu.image} alt={menu.title} width={1000} height={1000} className="w-full h-full object-cover rounded-lg" />
            </div>
            <div className="z-10 w-1/2 flex flex-col items-center justify-center px-5 py-1">
                {menu.steps && (
                    <ol className="space-y-4 text-lg text-primary-100 ">
                    {menu.steps.map((step) => (
                        <li key={step.stepNumber} className="flex gap-3 items-start ">
                        <span className="bg-primary-100 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold p-4">
                            {step.stepNumber}
                        </span>
                        <p className={`text-justify font-Inter font-semibold ${step.stepNumber % 2 === 0 ? 'text-foreground' : ''}`}>{step.description}</p>
                        </li>
                    ))}
                    </ol>
                )}
            </div>
        </div>
    )
}

export default index
