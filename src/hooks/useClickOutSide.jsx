import { useEffect, useRef } from 'react';

const useClickOutSide = (handler) => {

	const ref = useRef(null);

	useEffect(() => {
		const handleClickOutSide = (event) => {
			if (ref.current && !ref.current.contains(event.target)) {
				handler();
			}
		};
		// document.addEventListener("click", handleClickOutSide);
		document.addEventListener("mousedown", handleClickOutSide);
		document.addEventListener("touchstart", handleClickOutSide);

    return () => {
		// document.removeEventListener("click", handleClickOutSide);
		document.removeEventListener("mousedown", handleClickOutSide);
		document.removeEventListener("touchstart", handleClickOutSide);
    };
	}, [ handler ]);

	return ref;

};

export default useClickOutSide;