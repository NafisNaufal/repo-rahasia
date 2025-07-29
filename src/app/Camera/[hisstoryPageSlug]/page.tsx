import React from 'react'
import MainLayout from '@/shared/MainLayout/index'
import HistoryPageContainer from '@/feature/Camera/[historyPageSlug]/container/index'

const page = () => {
    return (
        <MainLayout>
            <HistoryPageContainer />
        </MainLayout>
    )
}

export default page
