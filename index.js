document.addEventListener('alpine:init', () => {
    Alpine.data('taxis', () => ({
        id: 0,
        rank: 'Johannesburg',
        destination: '',
        count: 0,
        taxiStatus: 'Not Full',
        taxiFare: 0,
        totalFare: 0,
        availableTaxis: 0,
        limit: 15,
        buttonDisabled: false,
        registration: '',
        routes: [],

        disableButton(){
            return this.buttonDisabled
        },

        getTotalFare(id){
            const tobeIncreased = this.getInfo().find(item => item.id == id)
            tobeIncreased.totalFare += tobeIncreased.count * tobeIncreased.taxiFare
            return tobeIncreased.totalFare
        },

        taxiDeparture(id){
            const toDepart = this.getInfo().find(item => item.id == id)
            if(toDepart.count >= 15){
                toDepart.count -= 15
                toDepart.availableTaxis--
            }

            if(toDepart.count < toDepart.limit){
                toDepart.taxiStatus = 'Not Full'
            }

            if(toDepart.availableTaxis == 0){
                toDepart.taxiStatus = 'No Taxi Available'
                this.buttonDisabled = true
            }

        },

        incrementCount(id){
            const tobeIncremented = this.getInfo().find(item => item.id == id)
            if(tobeIncremented.count >= 0){
                tobeIncremented.count++
                console.log(tobeIncremented)
            }

            if(tobeIncremented.count >= tobeIncremented.limit){
                tobeIncremented.taxiStatus = 'Taxi Full. Leave'
            }
        },

        decrementCount(id){
            const tobeDecremented = this.getInfo().find(item => item.id == id)
            if(tobeDecremented.count > 0){
                tobeDecremented.count--
            }

            if(tobeDecremented.count < tobeDecremented.limit){
                tobeDecremented.taxiStatus = 'Not Full'
            }
        },

        

        setInfo(){
            this.routes.push({
                rank: this.rank,
                id: this.id++,
                destination: this.destination,
                count: this.count,
                taxiStatus: this.taxiStatus,
                taxiFare: this.taxiFare,
                totalFare: this.totalFare, 
                availableTaxis: this.availableTaxis,
                limit: this.limit,
            })

        },

        getInfo(){
            // this.setInfo()
            this.destination = ''
            return this.routes
        },

        getCount(){
            console.log(this.count)
            return this.count
        }

    }))
})