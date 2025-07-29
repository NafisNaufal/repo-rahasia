import MainLayout from '@/shared/MainLayout/index'
import MenuSlugContainer from '@/feature/Menu/[slug]/container/index'

interface paramsProps {
    params : {
        slug : string
    }
}

const page = ({params} : paramsProps) => {
    return (
        <MainLayout>
            <MenuSlugContainer params= {params}/>
        </MainLayout>
    )
}

export default page
