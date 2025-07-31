import { useEffect, useState } from 'react';
import type { KeyboardEvent } from 'react';
import type { FlashcardData } from '../../types/media';

const Flashcard = ({ question, answer, image }: FlashcardData) => {
    const [flipped, setFlipped] = useState<boolean>(false);

    const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // prevent scrolling when space is pressed
            setFlipped(prev => !prev);
        }
    };
    useEffect(() => {
        setFlipped(false);
    }, [question, answer, image]); // ensures reset when content changes

    return (
        <div
            className={`flashcard ${flipped ? 'flipped' : ''}`}
            onClick={() => setFlipped(prev => !prev)}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            aria-pressed={flipped}
        >
            <div className="card-content">
                {!flipped ? (
                    <div className="front">
                        {image && (
                            <img
                                src={image}
                                alt="illustration"
                                className="card-img"
                                width={100}
                                height={100}
                            />
                        )}
                        <div
                            className="card-text"
                            dangerouslySetInnerHTML={{ __html: question }}
                        />
                    </div>
                ) : (
                    <div className="back">
                        <div
                            className="card-answer"
                            dangerouslySetInnerHTML={{ __html: answer }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Flashcard;
