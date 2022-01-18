export const cinemasSessionsInfoModule = {
  state: () => ({
    cinemas: [
      {
        name: 'Кронверк Вью МЕГА JS',
        address: 'площадь Приведения Типов 13, корпус 3, «МЕГА JS», NaN-й этаж',
        id: 666,
        formats: [
          {
            format: '2D',
            sessions: [
              {
                time: '11:20',
                price: '200',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '13:15',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '16:10',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '18:05',
                price: '300',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '21:20',
                price: '300',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '23:55',
                price: '200',
                hall: '01',
                hallType: 'standart'
              }
            ]
          },
          {
            format: '3D',
            sessions: [
              {
                time: '10:30',
                price: '200',
                hall: '02',
                hallType: 'standart'
              },
              {
                time: '12:35',
                price: '250',
                hall: '02',
                hallType: 'standart'
              },
              {
                time: '15:20',
                price: '250',
                hall: '02',
                hallType: 'standart'
              },
              {
                time: '18:20',
                price: '300',
                hall: '02',
                hallType: 'standart'
              },
              {
                time: '20:45',
                price: '300',
                hall: '02',
                hallType: 'standart'
              },
              {
                time: '23:25',
                price: '200',
                hall: '02',
                hallType: 'standart'
              }
            ]
          }
        ]
      },
      {
        name: 'Async Синема',
        address: 'Булиевое шоссе 14, «ТЦ AWAIT», 4-й этаж',
        id: 999,
        formats: [
          {
            format: '2D',
            sessions: [
              {
                time: '11:20',
                price: '200',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '14:10',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '15:30',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '16:25',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '17:40',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '18:35',
                price: '300',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '22:10',
                price: '250',
                hall: '01',
                hallType: 'standart'
              },
              {
                time: '23:05',
                price: '200',
                hall: '01',
                hallType: 'standart'
              }
            ]
          },
          {
            format: 'VIP',
            sessions: [
              {
                time: '10:20',
                price: '700',
                hall: '02',
                hallType: 'vip'
              },
              {
                time: '14:55',
                price: '750',
                hall: '02',
                hallType: 'vip'
              },
              {
                time: '17:20',
                price: '750',
                hall: '02',
                hallType: 'vip'
              },
              {
                time: '17:55',
                price: '810',
                hall: '02',
                hallType: 'vip'
              },
              {
                time: '20:35',
                price: '810',
                hall: '02',
                hallType: 'vip'
              },
              {
                time: '23:25',
                price: '700',
                hall: '02',
                hallType: 'vip'
              }
            ]
          }
        ]
      }],
    halls: [
      {
        hallType: 'standart',
        layout: [
          {
            row: 1,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'single' },
              { seat: 2, isOccupied: false, peopleCapacity: 'single' },
              { seat: 3, isOccupied: true, peopleCapacity: 'single' },
              { seat: 4, isOccupied: true, peopleCapacity: 'single' },
              { seat: 5, isOccupied: false, peopleCapacity: 'single' },
              { seat: 6, isOccupied: false, peopleCapacity: 'single' },
              { seat: 7, isOccupied: false, peopleCapacity: 'single' },
              { seat: 8, isOccupied: false, peopleCapacity: 'single' },
              { seat: 9, isOccupied: false, peopleCapacity: 'single' },
              { seat: 10, isOccupied: false, peopleCapacity: 'single' }
            ]
          },
          {
            row: 2,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'single' },
              { seat: 2, isOccupied: false, peopleCapacity: 'single' },
              { seat: 3, isOccupied: false, peopleCapacity: 'single' },
              { seat: 4, isOccupied: false, peopleCapacity: 'single' },
              { seat: 5, isOccupied: false, peopleCapacity: 'single' },
              { seat: 6, isOccupied: false, peopleCapacity: 'single' },
              { seat: 7, isOccupied: false, peopleCapacity: 'single' },
              { seat: 8, isOccupied: false, peopleCapacity: 'single' },
              { seat: 9, isOccupied: false, peopleCapacity: 'single' },
              { seat: 10, isOccupied: false, peopleCapacity: 'single' }
            ]
          },
          {
            row: 3,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'single' },
              { seat: 2, isOccupied: false, peopleCapacity: 'single' },
              { seat: 3, isOccupied: false, peopleCapacity: 'single' },
              { seat: 4, isOccupied: true, peopleCapacity: 'single' },
              { seat: 5, isOccupied: true, peopleCapacity: 'single' },
              { seat: 6, isOccupied: true, peopleCapacity: 'single' },
              { seat: 7, isOccupied: false, peopleCapacity: 'single' },
              { seat: 8, isOccupied: false, peopleCapacity: 'single' },
              { seat: 9, isOccupied: false, peopleCapacity: 'single' },
              { seat: 10, isOccupied: false, peopleCapacity: 'single' }
            ]
          },
          {
            row: 4,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'single' },
              { seat: 2, isOccupied: false, peopleCapacity: 'single' },
              { seat: 3, isOccupied: false, peopleCapacity: 'single' },
              { seat: 4, isOccupied: false, peopleCapacity: 'single' },
              { seat: 5, isOccupied: false, peopleCapacity: 'single' },
              { seat: 6, isOccupied: true, peopleCapacity: 'single' },
              { seat: 7, isOccupied: true, peopleCapacity: 'single' },
              { seat: 8, isOccupied: false, peopleCapacity: 'single' },
              { seat: 9, isOccupied: false, peopleCapacity: 'single' },
              { seat: 10, isOccupied: false, peopleCapacity: 'single' }
            ]
          },
          {
            row: 5,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'single' },
              { seat: 2, isOccupied: false, peopleCapacity: 'single' },
              { seat: 3, isOccupied: true, peopleCapacity: 'single' },
              { seat: 4, isOccupied: false, peopleCapacity: 'single' },
              { seat: 5, isOccupied: true, peopleCapacity: 'single' },
              { seat: 6, isOccupied: true, peopleCapacity: 'single' },
              { seat: 7, isOccupied: false, peopleCapacity: 'single' },
              { seat: 8, isOccupied: false, peopleCapacity: 'single' },
              { seat: 9, isOccupied: false, peopleCapacity: 'single' },
              { seat: 10, isOccupied: false, peopleCapacity: 'single' }
            ]
          }
        ]
      },
      {
        hallType: 'vip',
        layout: [
          {
            row: 1,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'double' },
              { seat: 2, isOccupied: false, peopleCapacity: 'double' },
              { seat: 3, isOccupied: false, peopleCapacity: 'double' },
              { seat: 4, isOccupied: false, peopleCapacity: 'double' },
            ]
          },
          {
            row: 2,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'double' },
              { seat: 2, isOccupied: false, peopleCapacity: 'double' },
              { seat: 3, isOccupied: false, peopleCapacity: 'double' },
              { seat: 4, isOccupied: false, peopleCapacity: 'double' },
            ]
          },
          {
            row: 3,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'double' },
              { seat: 2, isOccupied: false, peopleCapacity: 'double' },
              { seat: 3, isOccupied: false, peopleCapacity: 'double' },
              { seat: 4, isOccupied: false, peopleCapacity: 'double' },
            ]
          },
          {
            row: 4,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'double' },
              { seat: 2, isOccupied: false, peopleCapacity: 'double' },
              { seat: 3, isOccupied: false, peopleCapacity: 'double' },
              { seat: 4, isOccupied: false, peopleCapacity: 'double' },
            ]
          },
          {
            row: 5,
            seats: [
              { seat: 1, isOccupied: false, peopleCapacity: 'double' },
              { seat: 2, isOccupied: false, peopleCapacity: 'double' },
              { seat: 3, isOccupied: false, peopleCapacity: 'double' },
              { seat: 4, isOccupied: false, peopleCapacity: 'double' },
            ]
          }
        ]
      }
    ]
  }),
}