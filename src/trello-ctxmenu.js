function handleContextMenu(e, element) {
	element.click();

	var windowEl = document.getElementsByClassName("window")[0];
	var windowOverlayEl = document.getElementsByClassName("window-overlay")[0];
	var windowCloseEl = document.getElementsByClassName("js-close-window")[0];
	var moveCardEl = document.getElementsByClassName("js-move-card")[0];
	var popupEl = document.getElementsByClassName("pop-over")[0];

	var activeElement = document.activeElement;

	windowOverlayEl.addEventListener("mousedown", clickOff);
	activeElement.addEventListener("keydown", keyOff);

	applyStyle();

	moveCardEl.click();

	var popupCloseEl = document.getElementsByClassName("pop-over-header-close-btn")[0];
	var popupSubmitEl = popupEl.getElementsByClassName("js-submit")[0];

	popupCloseEl.addEventListener("mousedown", clickOff);
	popupSubmitEl.addEventListener("click", clickOffDelay);

	setTimeout(function() {
		popupEl.style.left = e.x + "px";
		popupEl.style.top = e.y + "px";
	}, 0);

	function applyStyle() {
		document.body.classList.add("trello-ctxmenu-open");
	}

	function undoStyle() {
		document.body.classList.remove("trello-ctxmenu-open");
	}

	function clickOff(e) {
		windowCloseEl.click();
		undoStyle();
		cleanUp();
	}

	function clickOffDelay(e) {
		setTimeout(function() {
			clickOff(e);
		}, 0);
	}

	function keyOff(e) {
		if(e.which == 27) {
			windowCloseEl.click();
			undoStyle();
			cleanUp();
		}
	}

	function cleanUp() {
		windowOverlayEl.removeEventListener("mousedown", clickOff);
		popupCloseEl.removeEventListener("mousedown", clickOff);
		activeElement.removeEventListener("keydown", keyOff);
		popupSubmitEl.removeEventListener("click", clickOffDelay);
	}
}

function initTrelloCard(element) {
	element.classList.add("trello-ctxmenu-card");

}

document.body.addEventListener("contextmenu", function(e) {
	if(e.which === 3 && e.target) {
		var target = e.target;
		while(target && !target.classList.contains("list-card")) {
			target = target.parentElement;
		}

		if(target) {
			if(target.classList.contains("trello-ctxmenu-card")) {
				initTrelloCard(target);
			}

			handleContextMenu(e, target);

			e.preventDefault();
			return false;
		}
	}
});
