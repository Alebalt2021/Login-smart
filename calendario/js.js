class Calendar {
    constructor(id) {
        this.cells = [];
        this.selectedDate = null;
        this.currentMonth = moment();
        this.elCalendar = document.getElementById(id);
        this.showTemplate();
        this.elGridBody = this.elCalendar.querySelector('.grid__body');
        this.elMonthName = this.elCalendar.querySelector('.month-name');
        this.showCells();
    }

    showTemplate() {
        this.elCalendar.innerHTML = this.getTemplate();
        this.addEventListenerToControls();
    }

    getTemplate() {
        let template = `
            <div class="calendar__header">
                <button type="button" class="control control--prev">&lt;</button>
                <span class="month-name">dic 2019</span>
                <button type="button" class="control control--next">&gt;</button>
            </div>
            <div class="calendar__body">
                <div class="grid">
                    <div class="grid__header">
                        <span class="grid__cell grid__cell--gh">Lun</span>
                        <span class="grid__cell grid__cell--gh">Mar</span>
                        <span class="grid__cell grid__cell--gh">Mié</span>
                        <span class="grid__cell grid__cell--gh">Jue</span>
                        <span class="grid__cell grid__cell--gh">Vie</span>
                        <span class="grid__cell grid__cell--gh">Sáb</span>
                        <span class="grid__cell grid__cell--gh">Dom</span>
                    </div>
                    <div class="grid__body">
                    </div>
                </div>
            </div>
        `;
        return template;
    }

    addEventListenerToControls() {
        let elControls = this.elCalendar.querySelectorAll('.control');
        elControls.forEach(elControl => {
            elControl.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('control--next')) {
                    this.changeMonth(true);
                } else {
                    this.changeMonth(false);
                }
                this.showCells();
            });
        });
    }

    changeMonth(next = true) {
        if (next) {
            this.currentMonth.add(1, 'months');
        } else {
            this.currentMonth.subtract(1, 'months');
        }
    }

    showCells() {
        this.cells = this.generateDates(this.currentMonth);
        if (this.cells === null) {
            console.error('No fue posible generar las fechas del calendario.');
            return;
        }

        this.elGridBody.innerHTML = '';
        let templateCells = '';
        let disabledClass = '';
        for (let i = 0; i < this.cells.length; i++) {
            disabledClass = '';
            if (!this.cells[i].isInCurrentMonth) {
                disabledClass = 'grid__cell--disabled';
            }
            // <span class="grid__cell grid__cell--gd grid__cell--selected">1</span>
            templateCells += `
                <span class="grid__cell grid__cell--gd ${disabledClass}" data-cell-id="${i}">
                    ${this.cells[i].date.date()}
                </span>
            `;
        }
        this.elMonthName.innerHTML = this.currentMonth.format('MMM YYYY');
        this.elGridBody.innerHTML = templateCells;
        this.addEventListenerToCells();
    }

    generateDates(monthToShow = moment()) {
        if (!moment.isMoment(monthToShow)) {
            return null;
        }
        let dateStart = moment(monthToShow).startOf('month');
        let dateEnd = moment(monthToShow).endOf('month');
        let cells = [];

        // Encontrar la primer fecha que se va a mostrar en el calendario
        while (dateStart.day() !== 1) {
            dateStart.subtract(1, 'days');
        }

        // Encontrar la última fecha que se va a mostrar en el calendario
        while (dateEnd.day() !== 0) {
            dateEnd.add(1, 'days');
        }

        // Genera las fechas del grid
        do {
            cells.push({
                date: moment(dateStart),
                isInCurrentMonth: dateStart.month() === monthToShow.month()
            });
            dateStart.add(1, 'days');
        } while (dateStart.isSameOrBefore(dateEnd));

        return cells;
    }

    addEventListenerToCells() {
        let elCells = this.elCalendar.querySelectorAll('.grid__cell--gd');
        elCells.forEach(elCell => {
            elCell.addEventListener('click', e => {
                let elTarget = e.target;
                if (elTarget.classList.contains('grid__cell--disabled') || elTarget.classList.contains('grid__cell--selected')) {
                    return;
                }
                // Deselecionar la celda anterior
                let selectedCell = this.elGridBody.querySelector('.grid__cell--selected');
                if (selectedCell) {
                    selectedCell.classList.remove('grid__cell--selected');
                }
                // Selecionar la nueva celda
                elTarget.classList.add('grid__cell--selected');
                this.selectedDate = this.cells[parseInt(elTarget.dataset.cellId)].date;
                // Lanzar evento change
                this.elCalendar.dispatchEvent(new Event('change'));
            });
        });
    }

    getElement() {
        return this.elCalendar;
    }

    value() {
        return this.selectedDate;
    }
}
// metodos de pago
const tarjeta = document.querySelector('#tarjeta'),
	  btnAbrirFormulario = document.querySelector('#btn-abrir-formulario'),
	  formulario = document.querySelector('#formulario-tarjeta'),
	  numeroTarjeta = document.querySelector('#tarjeta .numero'),
	  nombreTarjeta = document.querySelector('#tarjeta .nombre'),
	  logoMarca = document.querySelector('#logo-marca'),
	  firma = document.querySelector('#tarjeta .firma p'),
	  mesExpiracion = document.querySelector('#tarjeta .mes'),
	  yearExpiracion = document.querySelector('#tarjeta .year');
	  ccv = document.querySelector('#tarjeta .ccv');

// * Volteamos la tarjeta para mostrar el frente.
const mostrarFrente = () => {
	if(tarjeta.classList.contains('active')){
		tarjeta.classList.remove('active');
	}
}

// * Rotacion de la tarjeta
tarjeta.addEventListener('click', () => {
	tarjeta.classList.toggle('active');
});

// * Boton de abrir formulario
btnAbrirFormulario.addEventListener('click', () => {
	btnAbrirFormulario.classList.toggle('active');
	formulario.classList.toggle('active');
});

// * Select del mes generado dinamicamente.
for(let i = 1; i <= 12; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectMes.appendChild(opcion);
}

// * Select del año generado dinamicamente.
const yearActual = new Date().getFullYear();
for(let i = yearActual; i <= yearActual + 8; i++){
	let opcion = document.createElement('option');
	opcion.value = i;
	opcion.innerText = i;
	formulario.selectYear.appendChild(opcion);
}

// * Input numero de tarjeta
formulario.inputNumero.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNumero.value = valorInput
	// Eliminamos espacios en blanco
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '')
	// Ponemos espacio cada cuatro numeros
	.replace(/([0-9]{4})/g, '$1 ')
	// Elimina el ultimo espaciado
	.trim();

	numeroTarjeta.textContent = valorInput;

	if(valorInput == ''){
		numeroTarjeta.textContent = '#### #### #### ####';

		logoMarca.innerHTML = '';
	}

	if(valorInput[0] == 4){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/visa.png';
		logoMarca.appendChild(imagen);
	} else if(valorInput[0] == 5){
		logoMarca.innerHTML = '';
		const imagen = document.createElement('img');
		imagen.src = 'img/mastercard.png';
		logoMarca.appendChild(imagen);
	}

	// Volteamos la tarjeta para que el usuario vea el frente.
	mostrarFrente();
});

// * Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
	let valorInput = e.target.value;

	formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
	nombreTarjeta.textContent = valorInput;
	firma.textContent = valorInput;

	if(valorInput == ''){
		nombreTarjeta.textContent = "Nombre";
	}

	mostrarFrente();
});

// * Select mes
formulario.selectMes.addEventListener('change', (e) => {
	mesExpiracion.textContent = e.target.value;
	mostrarFrente();
});

// * Select Año
formulario.selectYear.addEventListener('change', (e) => {
	yearExpiracion.textContent = e.target.value.slice(2);
	mostrarFrente();
});

// * CCV
formulario.inputCCV.addEventListener('keyup', () => {
	if(!tarjeta.classList.contains('active')){
		tarjeta.classList.toggle('active');
	}

	formulario.inputCCV.value = formulario.inputCCV.value
	// Eliminar los espacios
	.replace(/\s/g, '')
	// Eliminar las letras
	.replace(/\D/g, '');

	ccv.textContent = formulario.inputCCV.value;
});