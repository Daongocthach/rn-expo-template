# Quy trinh Git cho AI - FineTag

Tai lieu nay la quy tac bat buoc cho AI va contributor khi thay doi FineTag.
Repo hien dang la private GitHub Free, nen GitHub Rulesets chua enforce duoc.
Vi vay, phai tuan thu dung nhanh lam viec, nhanh dich cua Pull Request (PR),
va checklist ben duoi. Khong push truc tiep vao cac nhanh tich hop.

## Cay nhanh

```text
main
└── develop
    └── feat/finetag
        ├── feat/finetag-platform-shared
        ├── feat/finetag-logged-in-devices
        └── feat/finetag-devices
            ├── feat/finetag-device-detail
            └── feat/finetag-device-management-checklist
```

Dau gach ngang trong ten nhanh la co chu y. Khong dung ten nhu
`feat/finetag/devices/device-detail`: Git khong cho phep no ton tai cung
`feat/finetag/devices`.

## Dung nhanh dich cua PR

| Nhanh nguon                                | Nhanh dich duy nhat    |
| ------------------------------------------ | ---------------------- |
| `feat/finetag-platform-shared`             | `feat/finetag`         |
| `feat/finetag-logged-in-devices`           | `feat/finetag`         |
| `feat/finetag-device-detail`               | `feat/finetag-devices` |
| `feat/finetag-device-management-checklist` | `feat/finetag-devices` |
| `feat/finetag-devices`                     | `feat/finetag`         |
| `feat/finetag`                             | `develop`              |
| `develop`                                  | `main`                 |

Khong tao PR tu nhanh con thang vao `develop` hoac `main`. Khong push truc
tiep vao `main`, `develop`, `feat/finetag`, hoac `feat/finetag-devices`.
Chi merge qua PR da duoc review.

## Truoc khi bat dau

1. Xac nhan dang o dung nhanh: `git branch --show-current`.
2. Cap nhat nhanh hien tai:

   ```bash
   git pull --ff-only
   ```

3. Neu nhanh dang lam phu thuoc vao nhanh cha da co thay doi, lay thay doi
   cua nhanh cha truoc khi code. Vi du voi device detail:

   ```bash
   git fetch origin
   git merge origin/feat/finetag-devices
   ```

   Xu ly conflict neu co, sau do chay lai kiem tra truoc khi push.

## Commit va push

Chi stage file thuoc pham vi task; luon kiem tra diff truoc khi commit:

```bash
git status
git diff --check
git diff
git add <cac-file-lien-quan>
yarn validate
yarn test
git commit -m "feat(finetag): add device detail screen"
git push
```

- Dung `yarn`, khong dung `npm`, `pnpm`, hoac `bun`.
- Khong dung `git commit --no-verify` hay `git push --no-verify`.
- Khong commit `.env`, secret, token, hoac file khong lien quan.
- Commit message phai theo dang `<type>(<scope>): <subject>`.
- Neu `yarn validate` hay `yarn test` fail, sua loi truoc khi commit/push.

## Tao va merge PR

1. Push nhanh cua task.
2. Tao PR dung theo bang **Nhanh dich cua PR**.
3. Ghi ro pham vi thay doi, cach test, va bat ky conflict/phu thuoc nao.
4. Chi merge sau khi `yarn validate`, `yarn test`, va review deu dat.
5. Sau khi nhanh con da merge, cap nhat nhanh ke tiep tu nhanh cha truoc khi
   tiep tuc lam viec.

Thu tu tich hop khuyen nghi:

```text
platform-shared -> finetag
device-detail + device-management-checklist -> finetag-devices
finetag-devices + logged-in-devices -> finetag
finetag -> develop -> main
```

Neu `feat/finetag-devices` can khung/types tu `platform-shared`, cap nhat no
tu `feat/finetag` sau khi PR platform-shared da merge, roi moi merge nhanh
devices ve `feat/finetag`.

## Khi chon sai nhanh dich

Khong merge PR. Dong PR hoac doi base branch sang nhanh dich dung trong giao
dien GitHub, sau do kiem tra lai diff va CI. Neu da merge nham, dung lai va
bao cho nguoi tich hop truoc khi tao commit revert; khong tu y force-push.
