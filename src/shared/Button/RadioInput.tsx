'use client'
import { useRouter } from "next/navigation"

import { 
    FormControl, 
    FormControlLabel, 
    FormLabel, 
    Radio, 
    RadioGroup, 
    styled 
} from "@mui/material"

const BpIcon = styled('span')(() => ({
    borderRadius: '50%',
    width: '16px',
    height: '16px',
    boxShadow: 'inset 0 0 1px rgba(16, 22, 26, 0.2), inset 0 1px 1px rgba(16, 22, 26, 0.1)',
    backgroundColor: '#F5F8FA',
    backgroundImage: 'linear-gradient(180deg, hsla(0, 0%, 100%, 0.8), hsla(0, 0%, 100%, 0))',
    '.Mui-focusVisible &': {
        outline : '2px auto rgba(19, 124, 189, 0.6)',
        outlineOffset: '2px',
    },
    'input:hover ~ &' : {
        backgroundColor: '#EBF1F5',
    },
    'input:disabled ~ &' : {
        backgroundColor: '#F0F0F0'
    }
}))

const BpCheckedIcon = styled(BpIcon)({
    backgroundColor: '#137cbd',
    backgroundImage: 'linear-gradient(180deg, hsla(0,0%,100%,.1), hsla(0,0%,100%,0))',
    '&:before' : {
        display: 'block',
        width: '16px',
        height: '16px',
        backgroundImage: 'radial-gradient(#fff, #fff 40%, transparent 50%)',
        content: '""',
    }
})

const StyledRadio = (props: any) => {
    return (
        <Radio
            disableRipple
            color="default"
            checkedIcon={<BpCheckedIcon />}
            icon={<BpIcon />}
            {...props}
        />
    )
}

interface RadioInputProps {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    page: number;
    limit: number;
}

const RadioInput = ({
    value,
    onChange,
    page = 1,
    limit
}: RadioInputProps) => {
    const router = useRouter();
    return (
        <FormControl >
            <FormLabel id="demo-radio-buttons-group-label" className="flex items-center justify-center"><h1 className="font-Inter text-xl text-primary-100 font-semibold">Select Input Method</h1></FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                row
                value={value}
                onChange={onChange}
                className="flex items-center justify-center"
            >
                <FormControlLabel value="Camera" control={<StyledRadio/>} label="Camera" />
                <FormControlLabel value="Upload Gambar" control={<StyledRadio/>} label="Upload Gambar" />
            </RadioGroup>
            <button 
            className="px-4 py-2 bg-primary-100 font-Inter text-base text-white hover:text-white rounded-lg hover:border-none hover:bg-primary-200  transition-colors duration-300 ease-in-out cursor-pointer"
            onClick={() => router.push(`/Camera/History?page=${page}&limit=${limit}`)}
            >
                History
            </button>
        </FormControl>
    );
};

export default RadioInput;


