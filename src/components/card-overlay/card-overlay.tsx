import { CardData } from '@/providers';
import React from 'react';
import { Card } from '../card/card';
import Overlay from '../overlay/overlay';

export const CardOverlay = ({ card, enabled }: { card: CardData | null; enabled: boolean }) => {
  return (
    <>
      {enabled && card && (
        <Overlay
          isOpen={enabled}
          onClose={function (): void {
            throw new Error('Function not implemented.');
          }}
        >
          <Card card={card}></Card>
        </Overlay>
      )}
    </>
  );
};
