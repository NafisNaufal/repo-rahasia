import Image from 'next/image'
import PesawatKertas from '@/Assets/footer/images/PesawatKertas.png'
import BendaFooter from '@/Assets/footer/images/bendaFooter.png'
import Hiasan from '@/Assets/footer/images/Hiasan.png'

const Footer = () => {
    return (
        <footer className='relative w-full flex items-center justify-between p-5 bg-background mb-5'>
            <div className='w-1/30'>
                <Image src={PesawatKertas} alt="Pesawat Kertas" width={500} height={500} className='w-full h-full object-cover' />
            </div>
                <Image src={Hiasan} alt="Hiasan" width={200} height={200} className='z-0 absolute -bottom-210 left-[10%] w-350 h-300 3xl:left-[10%]' />
            <div className='w-1/16'>
                <Image src={BendaFooter} alt="Benda Footer" width={500} height={500} className='w-full h-full object-cover' />
            </div>
        </footer>
    )
}

export default Footer;