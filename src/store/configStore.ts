import create from 'zustand'
import { immer } from 'zustand/middleware/immer'

export type Viewport = 'desktop' | 'tablet' | 'mobile'
export interface useCounterStateType {
    isDesktop: boolean,
    viewport: Viewport,
}
export const tabletWidth: number = 768
export const desktopWidth: number = 992
export const resolution = (viewport: number): 'desktop' | 'tablet' | 'mobile' => {
    if (viewport >= desktopWidth) {
        return 'desktop';
    }
    if (viewport >= tabletWidth && viewport < desktopWidth) {
        return 'tablet';
    }
    if (viewport < tabletWidth) {
        return 'mobile';
    }
    return 'desktop';
};


const useConfig = create(immer<useCounterStateType>((set) => ({
    isDesktop: window.innerWidth >= tabletWidth,
    viewport: resolution(window.innerWidth),


})))
export default useConfig
