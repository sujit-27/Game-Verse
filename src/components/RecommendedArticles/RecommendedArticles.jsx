import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchRecommendedArticles, fetchGameDescriptionBySlug } from '../../features/articlesSlice'
import character from '../../assets/character3.png'
import {useNavigate} from 'react-router-dom'

const RecommendedArticles = () => {
    const theme = useSelector((state) => state.theme.mode)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { data: articles, loading } = useSelector((state) => state.articles)
    const descriptions = useSelector((state) => state.articles.descriptions);

    const [largeIndex, setLargeIndex] = useState(null)
    const [smallIndexes, setSmallIndexes] = useState([])

    useEffect(() => {
        dispatch(fetchRecommendedArticles())
    }, [dispatch])

    useEffect(() => {
        if (articles.length >= 3) {
            const indexes = Array.from({ length: articles.length }, (_, i) => i)
            const shuffled = indexes.sort(() => 0.5 - Math.random())
            setLargeIndex(shuffled[0])
            setSmallIndexes([shuffled[1], shuffled[2]])
        }

        articles.forEach(article => {
            if (article.slug) {
                dispatch(fetchGameDescriptionBySlug(article.slug))
            }
        })
    }, [articles])

    const GameCoverImg = (image, height = '455px') => ({
        backgroundImage: `url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        height,
        width: '100%'
    })

    if (loading || smallIndexes.length < 2 || largeIndex === null) {
        return (
            <section className='sm:ml-0 sm:mr-45 my-10'>
                <div className='max-w-7xl mx-auto'>
                    <h1 className='text-3xl font-bold mb-6'>Recommended Articles</h1>
                    <div className='grid grid-cols-1 sm:grid-cols-2 sm:grid-rows-2 gap-4 mt-8'>
                        <div className='sm:row-span-2 bg-gray-300/20 rounded-xl h-[450px] animate-pulse'></div>
                        <div className='bg-gray-300/20 rounded-xl h-[220px] animate-pulse'></div>
                        <div className='bg-gray-300/20 rounded-xl h-[220px] animate-pulse'></div>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section id='articles' className='sm:flex-row sm:justify-between ml-0 sm:mr-45 my-10'>
            <div className='max-w-7xl mx-auto relative'>
                <div className='flex justify-between'>
                    <h1 className='text-3xl font-bold text-nowrap w-full'>Recommended Articles</h1>
                </div>
                <div className='relative z-10 sm:block '>
                    <div className='grid grid-cols-1 justify-center sm:grid-cols-2 sm:grid-rows-2 gap-4 mt-8'>
                        <div
                            style={GameCoverImg(articles[largeIndex].background_image)}
                            className='sm:row-span-2 rounded-xl h-[455px] relative w-full max-w-md sm:max-w-full'>
                            <div className='bg-black/20 h-full w-full'>
                                <div className='absolute bottom-0 left-0 w-full h-full flex items-end'>
                                  <div className='w-full bg-gradient-to-t from-black/80 to-transparent p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4'>
                                    <img
                                      src={articles[largeIndex].background_image}
                                      alt="Cover"
                                      className='h-[100px] w-[100px] sm:h-[140px] sm:w-[140px] object-cover rounded-xl'
                                    />
                                    <div className='text-center sm:text-left'>
                                      <h1 className='font-bold text-lg sm:text-xl text-white cursor-pointer hover:underline' 
                                onClick={(e) => {
                                    e.stopPropagation(); // prevents triggering parent card click
                                    navigate(`/game/${game.id}`);
                                }}>
                                        {articles[largeIndex].name}
                                      </h1>
                                      <p className='text-sm text-white/70'>
                                      {descriptions[articles[largeIndex].slug]
                                        ? descriptions[articles[largeIndex].slug].split(' ').slice(0, 45).join(' ') + '...'
                                        : 'Loading description...'}
                                    </p>

                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>

                        {smallIndexes.map((index) => (
                            <div
                                key={articles[index].id}
                                style={GameCoverImg(articles[index].background_image, '220px')}
                                className='rounded-xl relative'>
                                <div className='bg-black/20 h-full w-full'>
                                    <div className='absolute bottom-[-100px] sm:bottom-[-90px] left-0 w-full h-full items-end'>
                                        <div className='w-full bg-gradient-to-t from-black/80 to-transparent p-2 sm:p-4 flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-6'>
                                            <img
                                                src={articles[index].thumbnail || articles[index].background_image}
                                                alt="Cover"
                                                className='h-[80px] w-[80px] sm:h-[100px] sm:w-[100px] object-cover rounded-xl mx-auto sm:mx-0'
                                            />
                                            <div className='text-center sm:text-left max-w-xs sm:max-w-sm'>
                                                <h1 className='font-bold text-sm sm:text-lg text-white hover:underline cursor-pointer'
                                                   onClick={(e) => {
                                                    e.stopPropagation();
                                                    navigate(`/game/${game.id}`);
                                                }}
                                                >{articles[index].name}</h1>
                                                <p className='hidden sm:block text-sm text-white/70'>
                                                  {descriptions[articles[index].slug]
                                                    ? descriptions[articles[index].slug].split(' ').slice(0, 25).join(' ') + '...'
                                                    : 'Loading description...'}
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <img
                    src={character}
                    alt="Not-Found"
                    className='hidden sm:block absolute right-[-200px] top-[-63px] z-12 h-[112%] object-cover'
                />
            </div>
        </section>
    )
}

export default RecommendedArticles;
