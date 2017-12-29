import { trigger, sequence, transition, animate, style } from '@angular/core';

export const TableRowAnimation =
    trigger('TableRowAnimation', [
        transition('* => void', [
            style({ height: '*', opacity: '1', transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)' }),
            sequence([
                animate('.25s ease', style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none' })),
                animate('.1s ease', style({ height: '0', opacity: 0, transform: 'translateX(20px)', 'box-shadow': 'none' }))
            ])
        ]),
        transition('void => active', [
            style({ height: '0', opacity: '0', transform: 'translateX(20px)', 'box-shadow': 'none' }),
            sequence([
                animate('.1s ease', style({ height: '*', opacity: '.2', transform: 'translateX(20px)', 'box-shadow': 'none' })),
                animate('.35s ease', style({
                    height: '*', opacity: 1,
                    transform: 'translateX(0)', 'box-shadow': '0 1px 4px 0 rgba(0, 0, 0, 0.3)'
                }))
            ])
        ])
    ]);
