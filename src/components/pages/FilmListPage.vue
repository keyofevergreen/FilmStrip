<template>
  <main>
    <sort-by-genres :options="options"></sort-by-genres>
    <film-list :mode="'full'"></film-list>
  </main>
</template>

<script>
import FilmList from '../FilmList';
import SortByGenres from '../SortByGenres';

export default {
  name: 'FilmListPage',
  components: { FilmList, SortByGenres },
  data() {
    return {
      options: [
        {
          label: 'Все фильмы',
          value: null
        },
        {
          label: 'комедия',
          value: 'комедия'
        },
        {
          label: 'мультфильм',
          value: 'мультфильм'
        },
        {
          label: 'детский',
          value: 'детский'
        },
        {
          label: 'семейный',
          value: 'семейный'
        },
        {
          label: 'приключения',
          value: 'приключения'
        },
        {
          label: 'фантастика',
          value: 'фантастика'
        },
        {
          label: 'фэнтези',
          value: 'фэнтези'
        },
        {
          label: 'боевик',
          value: 'боевик'
        },
        {
          label: 'криминал',
          value: 'криминал'
        },
        {
          label: 'драма',
          value: 'драма'
        },
        {
          label: 'мелодрама',
          value: 'мелодрама'
        },
        {
          label: 'мюзикл',
          value: 'мюзикл'
        },
        {
          label: 'военный',
          value: 'военный'
        },
        {
          label: 'документальный',
          value: 'документальный'
        },
        {
          label: 'триллер',
          value: 'триллер'
        },
        {
          label: 'ужасы',
          value: 'ужасы'
        },
        {
          label: 'биография',
          value: 'биография'
        },
        {
          label: 'история',
          value: 'история'
        },
        {
          label: 'спорт',
          value: 'спорт'
        },
        {
          label: 'короткометражка',
          value: 'короткометражка'
        },
        {
          label: 'детектив',
          value: 'детектив'
        },
        {
          label: 'концерт',
          value: 'концерт'
        },
      ]
    }
  }
}
</script>