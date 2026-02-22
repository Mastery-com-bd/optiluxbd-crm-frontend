import HeaderActions from '@/components/pages/dashboard/admin/scratch-cards/HeaderActions';
import PageHeader from '@/components/pages/dashboard/shared/pageHeader';
import { getAllScratchCards } from '@/service/scratch-cards/scratchCard';
import ScratchCardList from '@/components/pages/dashboard/admin/scratch-cards/ScratchCardList';
import { Query, TSearchParams } from '@/types/shared';


export default async function ScratchCard({ searchParams }: { searchParams?: TSearchParams }) {
    const query = await searchParams;
    const scratchCard = await getAllScratchCards(query as Query);
    return (
        <div>
            <div className='flex justify-between items-center'>
                <PageHeader title='All scratch cards' description='Play with scratch cards' />
                <div>
                    <HeaderActions />
                </div>
            </div>
            <ScratchCardList scratchCards={scratchCard.data} pagination={scratchCard.pagination} />
        </div>
    )
}