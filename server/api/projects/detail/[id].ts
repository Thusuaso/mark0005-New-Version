import api from '~/sql/api';
export default defineEventHandler(async (event) => {
    const id = getRouterParam(event,'id');
    const photosSql = `
        select 

	mpd.ID,
	mpd.ProjectId,
	mpd.ProductName,
	mpd.ImageLink,
	mpd.Queue,
	mpd.ImageName,
	mpd.ProductName_Fr,
	mpd.ProductName_Es,
	mpd.ProductName_Ru,
	mpd.ProductName_Ar


from MekmarCom_Project_Detail mpd
where mpd.ImageStatus=1 and mpd.ProjectId='${id}'
order by mpd.Queue
    `;
    const videoSql = `
        select 

	mpd.ID,
	mpd.ProjectId,
	mpd.ProductName,
	mpd.ProductName,
	mpd.ProductName_Fr,
	mpd.ProductName_Es,
	mpd.ProductName_Ru,
	mpd.VideosLink

from MekmarCom_Project_Detail mpd
where mpd.VideosStatus=1 and mpd.ProjectId='${id}'
order by mpd.Queue
    `;
    const descriptionSql = `
select 
top 1
	mpi.ID,
	mpi.ProjectId,
	mpi.ProjectInformation,
	mpi.ProjectProductName,
	mpi.ProjectInformation_Fr,
	mpi.ProjectInformation_Es,
	mpi.ProjectInformation_Ru,
	mpi.ProjectInformation_Ar,
	mp.ProjectName,
	mp.ProjectName_Fr,
	mp.ProjectName_Es,
	mp.ProjectName_Ru,
	mp.ProjectName_Ar,
	mp.CountryName,
	mp.CountryName_Fr,
	mp.CountryName_Es,
	mp.CountryName_Ru,
	mp.CountryName_Ar

from MekmarCom_Projects_Information mpi
inner join MekmarCom_Projects mp on mp.ID = mpi.ProjectId
where mpi.ProjectId='${id}'
    `;
    const suggestedSql = `
    select 

	mps.ID,
	mps.ProjectId,
	mps.SuggestedId,
	mp.ProjectName,
	mp.ProjectName_Fr,
	mp.ProjectName_Es,
	mp.ProjectName_Ru,
	mp.ProjectName_Ar,
	mp.CountryName,
	mp.CountryName_Fr,
	mp.CountryName_Es,
	mp.CountryName_Ru,
	mp.CountryName_Ar,
	mp.Image,
	(TRIM('/projects/detail/' + LOWER(REPLACE(RTRIM(mp.ProjectName),' ','-')) +'/'+ TRIM(STR(mp.ID)))) as Link


from MekmarCom_Projects_Suggested mps
inner join MekmarCom_Projects mp on mp.ID = mps.SuggestedId
where mps.ProjectId = '${id}'
    `;

    /* Benzer projeler eslestirme tablosundan (MekmarCom_Projects_Suggested)
       geliyor ve oraya proje basina IKI satir girilmis. Istenen her projede
       DORT oneri; bunu veritabanina elle satir ekleyerek degil kodda
       tamamlayarak yapiyoruz, cunku aksi halde her yeni proje eklendiginde
       dort satirin elle girilmesi gerekir ve biri unutulunca bolum yine
       eksik kalir.

       Doldurma sirasi keyfi degil: once AYNI ULKEDEKI projeler, sonra
       vitrin sirasi (Queue). "Benzer" baslginin altinda rastgele bir proje
       gostermemek icin en yakin olcut ulke.

       Gorseli olmayan projeler disarida: ProjectsTile gorselsiz bos bir
       kutu olarak cikardi. Elle secilenler zaten listede oldugu icin
       `not in` ile ayiklaniyor, yoksa ayni proje iki kez gorunurdu. */
    const suggestedFillSql = `
    select top 4

	mp.ID,
	'${id}' as ProjectId,
	mp.ID as SuggestedId,
	mp.ProjectName,
	mp.ProjectName_Fr,
	mp.ProjectName_Es,
	mp.ProjectName_Ru,
	mp.ProjectName_Ar,
	mp.CountryName,
	mp.CountryName_Fr,
	mp.CountryName_Es,
	mp.CountryName_Ru,
	mp.CountryName_Ar,
	mp.Image,
	(TRIM('/projects/detail/' + LOWER(REPLACE(RTRIM(mp.ProjectName),' ','-')) +'/'+ TRIM(STR(mp.ID)))) as Link

from MekmarCom_Projects mp
where mp.ID <> '${id}'
  and mp.Image is not null
  and LTRIM(RTRIM(mp.Image)) <> ''
  and mp.ID not in (
      select mps.SuggestedId from MekmarCom_Projects_Suggested mps where mps.ProjectId = '${id}'
  )
order by
  case when mp.CountryName = (select top 1 CountryName from MekmarCom_Projects where ID = '${id}') then 0 else 1 end,
  mp.Queue
    `;

    return new Promise(async (resolve, reject) => {

        (await api).query(photosSql, async (err, photos) => {
            (await api).query(videoSql, async (err, video) => {
                (await api).query(descriptionSql, async (err, description) => {
                    (await api).query(suggestedSql, async (err, suggested) => {
                        (await api).query(suggestedFillSql, async (err, fillers) => {
                            /* Elle secilenler ONCE, doldurma sonra; dort
                               taneye tamamlanip orada kesiliyor. */
                            const curated = suggested?.recordset ?? [];
                            const merged = [...curated];
                            const seen = new Set(curated.map((row: any) => String(row.SuggestedId)));

                            for (const row of (fillers?.recordset ?? [])) {
                                if (merged.length >= 4) break;
                                const key = String((row as any).SuggestedId);
                                if (seen.has(key)) continue;
                                seen.add(key);
                                merged.push(row);
                            }

                            const data = {
                                'photos': photos?.recordset,
                                'video': video?.recordset,
                                'description': description?.recordset,
                                'suggested': merged.slice(0, 4)
                            };
                            resolve(data);
                        });
                    });
                });
            });
        });
    });
});