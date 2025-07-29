import { CardItemsMenu } from "../data/type";
import GulaiKambing from '@/Assets/Menu/images/image 1.png';
import TongsengAyam from '@/Assets/Menu/images/unsplash_Yr4n8O_3UPc.png';
import GrangAsem from '@/Assets/Menu/images/unsplash_aOuyTKulGdI.png'

export const cardItemsMenu: CardItemsMenu[] = [
    {
        id: 1,
        title: 'Gulai Kambing',
        description: 'Daging Kambing dan iga - santan kental - Bumbu halus : - bawang merah - bawang putih - cabe keriting - kunyit - jahe - lengkuas - kemiri - jintan - pala ',
        image: GulaiKambing,
        slug: 'gulai-kambing',
        time: '10 mins',
        people: '2-4 Orang',
        steps: [
            { stepNumber: 1, description: 'Presto kurang lbh 20 menit, lalu potong2 daging, dan sisihkan jg iga' },
            { stepNumber: 2, description: 'Blender sampai halus bumbu, lalu tumis bersama bumbu cemplung, tunggu sampai bumbu benar2 bau harum dan tdk langu' },
            { stepNumber: 3, description: 'Setelah bumbu benar2 matang masukkan ke santan, dan masukkan daging kambingnya' },
            { stepNumber: 4, description: 'Aduk2 sampai tercampur rata jgn lupa masukkan garam, gula, dan kaldu bubuk aduk2 rata dan tes rasa, lalu masukkan bawang merah goreng' },
            { stepNumber: 5, description: 'Dan gule kambing siap di hidangkan bersama nasi panas dan sambal kecap' },
            { stepNumber: 6, description: 'Happy cooking' },
        ]
    },
    {
        id: 2,
        title: 'Tongseng Ayam',
        description: 'Ayam - kol putih (potong kotak) - santan cair - sereh (geprek) - tomat (iris sesuai selera) - Minyak untuk menumis - Bawang merah - bawang putih - Kemiri (Sangrai) - Cabe keriting (Sesuai selera) - ketumbar - Garam',
        image: TongsengAyam,
        slug: 'tongseng-ayam',
        time: '15 mins',
        people: '2-4 Orang',
        steps: [
            {stepNumber: 1, description: 'Potong ayam menjadi beberapa bagian, cuci bersih dan sisihkan'},
            {stepNumber: 2, description: 'Ulek atau blender bumbu halus lalu tumis sebentar dan masukkan sereh geprek. Tumis hingga bumbu matang'},
            {stepNumber: 3, description: 'Masukkan ayam yang sudah dibersihkan, aduk merata sampai ayam setengah matang'},
            {stepNumber: 4, description: 'Masukkan santan cair, aduk merata lalu beri garam, gula dan penyedap rasa.'},
            {stepNumber: 5, description: 'Masukkan kol dan cabe rawit utuh. Masak hingga matang'},
        ]
    },
    {
        id: 3,
        title: 'Garang Asem',
        description: 'Dada ayam - tahu putih - santan instan - air - bawang merah - bawang putih - tomat hijau - tomat merah - belimbing wuluh - cabe merah - cabe hijau - cabe rawit hijau',
        image: GrangAsem,
        slug: 'garang-asem',
        time: '20 mins',
        people: '2-4 Orang',
        steps: [
            { stepNumber: 1, description: 'Potong-potong semua bumbu sesuai selera. Tahu dan ayam potong dadu.'},
            { stepNumber: 2, description: 'Gunakan bowl tata potongan ayam berselang seling dengan potongan bumbu dan tahu. Kemudian tambahkan garam, gula, kaldu bubuk dan santan.'},
            { stepNumber: 3, description: 'Masukkan air dan santan.'},
            { stepNumber: 4, description: 'Siapkan magicom isi air secukupnya, letak tatakan kukusan dan bowl. Masak sesuai waktu dan sistem kukus dari magicom.'},
            { stepNumber: 5, description: 'Setelah matang kurang lebih 1 jam, aduk agar bumbu merata. Sajikan selagi hangat'},
        ]
    }
];
