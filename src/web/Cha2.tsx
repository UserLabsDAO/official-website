import { forwardRef, useImperativeHandle, useRef } from 'react';
import { MENUTOP_OFFSET } from '../data/Constant';
import { useTranslation2 } from '../language/useTranslation';
import cha2P1 from '../resources/cha2_p1.png';
import cha2P2 from '../resources/cha2_p2.png';
import getContentStyle from '../util/ContentStyleUtil';
import { ChapterContent, ChapterImage, ChapterMultiContent, ChapterTitle } from './Cha1';
import ClaimButton from './ClaimButton';
import './Main.css';
import { LANG_ENGLISH } from '../language/LanguageContext';

const Cha2 = forwardRef<any, any>((props, ref) => {
    const rootRef = useRef(null as any);
    const claimButtonRef = useRef(null as any);

    const { t, lan } = useTranslation2()
    const { ContentStyle, KeyNumStyle } = getContentStyle(lan);

    useImperativeHandle(ref, () => ({
        showClaimAni: (position, money, skipAnim = false) => {
            claimButtonRef?.current?.showAni(money, skipAnim);
        },
        menuTops: () => {
            return rootRef?.current?.offsetTop - MENUTOP_OFFSET;
        }

    }));

    const isEnglish = lan == LANG_ENGLISH;

    return (
        <div ref={rootRef} className='chapter_block'>
            <ChapterTitle text='Chapter II - Why Now?' />
            <ChapterContent text={t('cha2_c1')} />
            <div style={{ marginTop: 20 }}>
                <ChapterImage url={cha2P1} width={760} height={406} desc={t('cha2_p1')} />
            </div>
            <div style={{ marginTop: -25 }}>
                <ChapterContent text={t('cha2_c2')} />
            </div>
            <ChapterContent text={t('cha2_c3')} />
            <ChapterImage url={cha2P2} width={750} height={255} desc={t('cha2_p2')} cusTextStyle={isEnglish ? { whiteSpace: 'pre' } : undefined} />
            <ChapterContent text={t('cha2_c4')} />
            <ChapterContent text={t('cha2_c5')} />
            <ChapterMultiContent text='' texts={[t('cha2_c6'), t('cha2_c7'), t('cha2_c8'), t('cha2_c9'), t('cha2_c10')]} />
            <ChapterMultiContent text='' texts={[t('cha2_c11'), t('cha2_c12'), t('cha2_c13')]} />
            <ChapterContent text={t('cha2_c14')} />
            <ChapterMultiContent text='' texts={[t('cha2_c15'), t('cha2_c16'), t('cha2_c17')]} />
            <div style={{ ...ContentStyle, display: 'flex' }}>
                {props.info == null ?
                    t('cha2_c18')
                    :
                    <>
                        <span>
                            {t('cha2_c18_1')}
                        </span>
                        <span style={{ ...KeyNumStyle, textIndent: 0 }}>{props.info.balance.toString()}</span>
                        <span style={{ textIndent: 0 }}>{t('cha2_c18_2')}</span>
                    </>
                }
                <ClaimButton
                    ref={claimButtonRef}
                    label={t('cha2_c19')}
                    position={2}
                    onClaimClick={() => { props.claim(2) }}
                    onAniDone={() => { props.onAniDone(2) }} />
            </div>
        </div>
    );
});
export default Cha2;