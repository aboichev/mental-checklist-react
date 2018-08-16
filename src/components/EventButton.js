import React from 'react';

import Button from 'components/Button';
import GameMachine from 'state/GameMachine';

const EventButton = ({ event, children, bg }) => (
    <GameMachine
        render={({ transition }) => (
            <Button type="button" onClick={() => transition(event)} bg={ bg }>
                {children}
            </Button>
        )}
    />
);

export default EventButton;