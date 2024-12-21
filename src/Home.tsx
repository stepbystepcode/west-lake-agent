import {TbWorld} from 'react-icons/tb';
import i18n from './i18n';


export const Home = () => {
    const changeLanguage = (lng:string) => {
        i18n.changeLanguage(lng);
      }
    return (
    <>
    <header>
        <div onClick={() => changeLanguage('en')}>
<TbWorld/></div>
    </header>
    </>
    )
};